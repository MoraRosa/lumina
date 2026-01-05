@echo off
echo Adding all changes...
git add -A

echo.
echo Committing changes...
git commit -m "Fix newsletter and contact form - Remove localStorage, add Shopify customer creation"

echo.
echo Pushing to GitHub...
git push

echo.
echo Done!
pause

