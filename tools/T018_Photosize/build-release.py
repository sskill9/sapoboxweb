"""Build an immutable local distribution. This command never publishes anything.
Usage: python build-release.py [--root TOOL_DIR] [--output-dir OUTPUT_DIR]
Requires Python 3.10+ and Node.js. Only run on trusted local tool-config.js.
"""
from pathlib import Path, PurePosixPath
from html.parser import HTMLParser
from urllib.parse import urlsplit
import argparse, subprocess, json, re, zipfile, io, hashlib, datetime

class BuildError(ValueError): pass

def safe_path(value):
    if not isinstance(value,str) or not value or not re.fullmatch(r'[A-Za-z0-9_. /-]+',value) or value.startswith(('/', '-')):
        raise BuildError(f'Unsafe path: {value!r}')
    if any(x in ('', '.', '..') for x in value.split('/')) or ':' in value or '\\' in value:
        raise BuildError(f'Unsafe path: {value!r}')
    return value

def load_config(root):
    script="const fs=require('fs'),vm=require('vm');const c={window:{}};vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),c,{timeout:1000});process.stdout.write(JSON.stringify(c.window.SAPO_TOOL));"
    return json.loads(subprocess.check_output(['node','-e',script,str(root/'tool-config.js')],text=True,encoding='utf-8',timeout=10))

class References(HTMLParser):
    def __init__(self): super().__init__(); self.refs=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        for key in ('src','href','poster','data'):
            if key in attrs and (key!='data' or tag=='object'):
                self.refs.append((attrs[key],tag=='a' and key=='href'))
        if 'srcset' in attrs:
            raise BuildError('srcset requires an explicit supported dependency scanner; refusing incomplete validation')
        if 'style' in attrs: self.refs += [(v,False) for v in css_refs(attrs['style'])]

def css_refs(text):
    return re.findall(r'url\(\s*[\"\']?([^\s)\"\']+)',text,re.I)+re.findall(r'@import\s+[\"\']([^\"\']+)',text,re.I)

def references(name,text):
    suffix=Path(name).suffix.lower()
    if suffix in ('.html','.htm'):
        p=References();p.feed(text);return p.refs+[(v,False) for v in css_refs(text)]
    if suffix=='.css':return [(v,False) for v in css_refs(text)]
    if suffix=='.js':
        patterns=[r'\.\s*(?:src|href)\s*=\s*[\"\']([^\"\']+)[\"\']',r'(?:fetch|import|importScripts|Worker)\s*\(\s*[\"\']([^\"\']+)[\"\']',r'\bfrom\s+[\"\']([^\"\']+)[\"\']',r'\bimport\s+[\"\']([^\"\']+)[\"\']',r'new\s+URL\s*\(\s*[\"\']([^\"\']+)[\"\']']
        return [(v,False) for pattern in patterns for v in re.findall(pattern,text)]
    return []

def build(root,output):
    root=Path(root).resolve();output=Path(output).resolve()
    if (root/'tool-config.js').is_symlink():raise BuildError('Symlink config is forbidden')
    c=load_config(root);r=c['release']; ident=c['id'];version=r['version']
    if not re.fullmatch(r'T\d{3}',ident) or not re.fullmatch(r'\d+\.\d+\.\d+',version):raise BuildError('Invalid ID/version')
    if not re.fullmatch(r'\d+\.\d+\.\d+',r['templateVersion']):raise BuildError('Invalid templateVersion')
    datetime.date.fromisoformat(r['date'])
    if not isinstance(r.get('changes'),list) or not r['changes'] or not all(isinstance(v,str) and v.strip() for v in r['changes']):raise BuildError('Release changes required')
    manifest=c['distribution'];names=manifest['files']
    if not isinstance(names,list) or len(names)!=len(set(names)):raise BuildError('Manifest must list unique files')
    for name in names:safe_path(name)
    required=['tool-config.js',c['downloads']['entryFile'],'README.txt','VERSIONING.txt']+manifest['dynamicDependencies']+manifest['licenseFiles']
    for name in required:
        safe_path(name)
        if name not in names:raise BuildError(f'Required file missing from manifest: {name}')
    payload={}
    for name in names:
        p=root/name
        if any(parent.is_symlink() for parent in [p,*p.parents] if parent!=root and root in parent.parents):raise BuildError(f'Symlink forbidden: {name}')
        if not p.is_file():raise BuildError(f'Missing manifest file: {name}')
        payload[name]=p.read_bytes()
    for name,data in payload.items():
        if Path(name).suffix.lower() not in ('.html','.htm','.css','.js'):continue
        for ref,is_link in references(name,data.decode('utf-8')):
            if ref.startswith(('#','data:','blob:')):continue
            if urlsplit(ref).scheme or ref.startswith('//'):
                if is_link and ref.startswith(('https://','http://','mailto:')):continue
                raise BuildError(f'External runtime dependency in {name}: {ref}')
            while ref.startswith('./'):ref=ref[2:]
            safe_path(ref)
            target=str(PurePosixPath(name).parent/ref)
            if target not in payload:raise BuildError(f'Unlisted or missing dependency: {name} -> {target}')
    # Distribution behavior is independent of publication truth; preserve release verbatim.
    c.setdefault('headerLinks',{})['mode']='download'
    c['downloads']['enabled']=False
    payload['tool-config.js']=('window.SAPO_TOOL = '+json.dumps(c,ensure_ascii=False,indent=2)+';\n').encode('utf-8')
    buf=io.BytesIO()
    with zipfile.ZipFile(buf,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for name,data in sorted(payload.items()):
            info=zipfile.ZipInfo(f'{ident}-v{version}/{name}',(1980,1,1,0,0,0));info.create_system=3;info.external_attr=0o100644<<16
            z.writestr(info,data,compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
    data=buf.getvalue(); output.mkdir(parents=True,exist_ok=True);archive=output/f'{ident}-v{version}.zip'
    if archive.exists():
        if archive.read_bytes()!=data:raise BuildError('Existing version differs. Keep old ZIP and choose a new candidate directory or increase release.version; never overwrite a release.')
    else:
        with archive.open('xb') as f:f.write(data)
    with zipfile.ZipFile(archive) as z:
        if z.testzip() is not None:raise BuildError('ZIP CRC failure')
    return {'file':str(archive),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'entries':sorted(payload),'published':r['published']}

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parent);parser.add_argument('--output-dir',type=Path)
    args=parser.parse_args()
    try:print(json.dumps(build(args.root,args.output_dir or args.root/'dist'),ensure_ascii=False))
    except (BuildError,KeyError,ValueError,OSError,subprocess.SubprocessError) as error:raise SystemExit(f'Build failed: {error}')
