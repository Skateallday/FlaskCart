# Store root location
$ROOT = Get-Location

# 1. Build the frontend
Set-Location app
npm run build

# 2. Switch to production
Set-Location $ROOT
git checkout production

# 3. Copy build files to server/static
Copy-Item -Recurse -Force app/build/* server/static/

# 4. Commit and push to production
git add .
git commit -m "Production build $(Get-Date)"
git push FlaskCart production

# 5. Switch back to master
git checkout master