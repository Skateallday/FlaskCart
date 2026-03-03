$ROOT = Get-Location

# 1. Build the frontend
Set-Location app
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Aborting deploy."
    Set-Location $ROOT
    exit 1
}

# 2. Switch to production
Set-Location $ROOT
git checkout production
git pull FlaskCart production

# 3. Create static folder and copy build files
New-Item -ItemType Directory -Force -Path server/static | Out-Null
Copy-Item -Force app/build/index.html server/static/
Copy-Item -Force app/build/asset-manifest.json server/static/
Copy-Item -Force app/build/manifest.json server/static/
Copy-Item -Force app/build/robots.txt server/static/
Copy-Item -Force app/build/favicon.ico server/static/
Copy-Item -Recurse -Force app/build/static server/static/

# 4. Commit and push
git add server/static/
git commit -m "Production build $(Get-Date -Format 'dd/MM/yyyy HH:mm')"
git push FlaskCart production --force

# 5. Switch back to master
git checkout master
Write-Host "Deploy complete!"