@echo off
setlocal enabledelayedexpansion

echo ============================================
echo  Lumina push helper
echo ============================================
echo.

echo [1/4] Running production build as a sanity check...
echo (This is what would have caught the storage.ts missing-extension
echo  issue before it ever reached the repo.)
echo.
call npm run build
if errorlevel 1 (
    echo.
    echo ============================================
    echo  BUILD FAILED. Nothing was committed or pushed.
    echo  Fix the error above, then run push.bat again.
    echo ============================================
    pause
    exit /b 1
)
echo.
echo Build succeeded.
echo.

echo [2/4] Files that would be included in this commit:
echo ----------------------------------------------
git status --short
echo ----------------------------------------------
echo.
echo Review the list above carefully. This is exactly the step that would
echo have caught REVIEW_IMAGES_SETUP_COMPLETE.md accidentally riding along
echo with an unrelated commit -- if you see anything here you did NOT mean
echo to commit, press Ctrl+C now and sort it out first.
echo.
set /p CONFIRM="Continue and stage these files? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo.
    echo Cancelled. Nothing was staged, committed, or pushed.
    pause
    exit /b 0
)
echo.

echo [3/4] Staging and committing...
git add -A
set /p COMMITMSG="Commit message: "
if "%COMMITMSG%"=="" (
    echo.
    echo No commit message entered. Cancelled -- nothing was committed.
    pause
    exit /b 1
)
git commit -m "%COMMITMSG%"
if errorlevel 1 (
    echo.
    echo ============================================
    echo  Commit failed, or there was nothing to commit.
    echo  Stopping before push.
    echo ============================================
    pause
    exit /b 1
)
echo.

echo [4/4] Pushing to origin...
git push
if errorlevel 1 (
    echo.
    echo ============================================
    echo  PUSH FAILED. Check the error above.
    echo  Your commit was created locally but not pushed --
    echo  fix the issue (e.g. pull first if rejected) and run
    echo  "git push" manually, or re-run this script.
    echo ============================================
    pause
    exit /b 1
)

echo.
echo ============================================
echo  Done! Changes built, committed, and pushed successfully.
echo ============================================
pause