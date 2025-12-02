@echo off
set "ZIPCMD=C:\Program Files\7-Zip\7z.exe"
set "TARGET=%~dp0"
for /f "delims=" %%A in ('powershell -command "Get-Date -Format yyyyMMddHHmmss"') do set "NOW=%%A"
set "ZIPNAME=%TARGET%%NOW%.zip"
cd /d "%TARGET%"
"%ZIPCMD%" a -tzip "%ZIPNAME%" * -xr!*.zip
echo Backup completed: %ZIPNAME%
