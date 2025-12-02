@echo off
setlocal

REM ===== Get target dir & zip name (first 4 chars of folder) =====
set "TARGET_DIR=%~dp0"
for %%A in ("%TARGET_DIR:~0,-1%") do set "CURR_FOLDER=%%~nxA"
set "ZIP_NAME=%CURR_FOLDER:~0,4%.zip"

REM ===== Locate 7-Zip =====
set "ZIP_EXE=C:\Program Files\7-Zip\7z.exe"
if not exist "%ZIP_EXE%" (
  for /f "delims=" %%p in ('where 7z 2^>nul') do set "ZIP_EXE=%%p"
)
if not exist "%ZIP_EXE%" (
  echo ERROR: 7-Zip not found.
  echo Install 7-Zip or add it to PATH.
  pause
  exit /b 1
)

REM ===== Overwrite if exists =====
cd /d "%TARGET_DIR%"
if exist "%ZIP_NAME%" del /f /q "%ZIP_NAME%"

REM ===== Create zip (exclude BK, *.zip, *.bat) =====
"%ZIP_EXE%" a -tzip "%ZIP_NAME%" * -x!BK -x!BK\* -x!*.zip -x!*.bat
if errorlevel 1 (
  echo ERROR: Compression failed.
  pause
  exit /b 1
)

for %%Z in ("%ZIP_NAME%") do set "ZSIZE=%%~zZ"
echo DONE: %ZIP_NAME%  size=%ZSIZE% bytes
pause
