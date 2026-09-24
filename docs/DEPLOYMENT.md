# Deployment

## Current Deployment

FlaskCart is live at:

`https://skateallday.pythonanywhere.com/`

PythonAnywhere hosts the Flask application and serves the React production build from `server/static`.

## Normal Deployment Method

Development happens on `master`. Production releases are made by merging `master` into `production` and pushing `production`.

Use this sequence from the repository root:

```powershell
git checkout master
git pull origin master

git checkout production
git pull origin production
git merge master
git push origin production

git checkout master
```

For a normal successful release, no manual PythonAnywhere login or file copying is required.

## Automated Production Pipeline

A push to `production` triggers `.github/workflows/deploy.yml`.

The current workflow:

1. Checks out `production`.
2. Uses Node 24.
3. Runs `npm ci` in `app/`.
4. Builds the React app.
5. Copies the build into `server/static`.
6. Commits changed generated static assets back to `production` with an `[skip ci]` commit.
7. Connects to PythonAnywhere over SSH.
8. Fails immediately if `.git/index.lock` exists.
9. Fetches `origin/production` and resets the PythonAnywhere checkout to it.
10. Verifies the deployed commit SHA exactly matches `origin/production`.
11. Installs backend requirements in the PythonAnywhere virtual environment.
12. Calls the PythonAnywhere reload API.

A GitHub Actions concurrency group prevents multiple production deploy jobs from running over each other.

## Deployment Hardening — 2026-09-24

The deployment workflow was hardened after a false-green deployment incident.

Previously, PythonAnywhere hit a stale `.git/index.lock`, causing `git reset --hard origin/production` to fail. The SSH script continued to `pip install`, so the Action still appeared successful and reloaded the old code.

The workflow now:

- uses `set -e` so command failures stop the SSH step;
- refuses to deploy when `.git/index.lock` exists;
- verifies local and remote production SHAs match;
- prints the deployed short SHA into the Action log;
- uses Node 24 instead of Node 18;
- uses `npm ci` instead of `npm install`;
- prevents overlapping production deploys.

A normal hardened deployment was successfully completed and the correct live version was confirmed on 2026-09-24.

The deliberate stale-lock failure-path test is still pending.

## How to Verify a Deployment

In GitHub Actions, open the latest `Deploy to Production` run.

The `Deploy on PythonAnywhere` step should contain:

```text
Deployed commit: <short-sha>
```

The `Reload PythonAnywhere` step should end with:

```text
Successfully reloaded PythonAnywhere
```

Then hard-refresh the live site and confirm the user-visible change.

A green Action is now meaningful only if the deploy and reload steps themselves are green.

## Frontend Configuration

`app/src/config/config.js` currently uses:

- `http://localhost:5000` when the browser is on `localhost` or `127.0.0.1`;
- same-origin API requests in production.

This removes the earlier local-to-production API coupling.

## Required Environment / Secrets

GitHub Actions requires configured secrets for:

- PythonAnywhere username.
- PythonAnywhere SSH key.
- PythonAnywhere API token.

The Flask production environment also requires a real `SECRET_KEY` and mail configuration where contact email notification is enabled.

Never commit credentials to the repository.

## Remaining Deployment Risks

### Generated static commit moves `production`

The Action currently commits the React build output back to `production`. That means the remote branch can advance after the developer's push, leaving a local `production` branch behind and causing a non-fast-forward rejection on the next release unless `git pull origin production` is run first.

This should be removed or redesigned so deployment does not create avoidable branch churn.

### Production SQLite database is tracked

`server/app.db` is tracked by Git. The PythonAnywhere deploy currently uses:

```bash
git reset --hard origin/production
```

Therefore a deployment can replace the live SQLite file with the repository version. The live database persistence strategy must be resolved before FlaskCart relies on production data durability.

The backup file created manually during the 2026-09-24 recovery protected that deployment, but manual backups are not an adequate long-term deployment design.

### Git lock handling

Do not automatically delete `.git/index.lock` in the deployment workflow. A lock can represent an active Git operation. The workflow deliberately fails visibly instead. If a lock occurs, confirm there is no running Git process before removing a stale lock manually.

## Build Commands

### Frontend

```bash
cd app
npm ci
npm run build
```

### Backend

```bash
cd server
pip install -r requirements.txt
```

## Deployment Checklist

- [ ] Relevant frontend tests pass.
- [ ] Relevant FlaskCart Playwright tests pass when coverage exists.
- [ ] Frontend production build passes.
- [ ] Relevant backend tests pass when the backend runner is configured.
- [ ] `SECRET_KEY` is set securely.
- [ ] Debug mode is off.
- [ ] Contact credentials are configured where required.
- [ ] Admin login works.
- [ ] Protected pantry endpoints reject guests.
- [ ] Static assets and React routes load directly.
- [ ] The GitHub Action reports the deployed SHA.
- [ ] PythonAnywhere reload reports HTTP 200.
- [ ] Database is backed up before schema/data-destructive changes.

## Rollback

- Keep the previous known-good code revision available.
- Back up the SQLite database before a rollback that may touch data.
- Revert or redeploy the known-good production revision.
- Restore database data only when required and only from a verified backup.
- Smoke-test public and admin surfaces after rollback.
