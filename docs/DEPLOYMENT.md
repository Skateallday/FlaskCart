# Deployment

## Current Deployment

FlaskCart is live at:

`https://skateallday.pythonanywhere.com/`

The deployment is hosted on PythonAnywhere.

## Production Architecture

- Flask is the production web application.
- Flask serves the React build from its static directory.
- Server paths that are not static files fall back to React's `index.html`.
- React uses the PythonAnywhere origin as its API base URL.
- SQLite data is stored with the Flask application.

## Build Process

### Frontend

```bash
cd app
npm install
npm run build
```

Copy or deploy the resulting build into the Flask static arrangement used by the repository.

### Backend

```bash
cd server
pip install -r requirements.txt
```

The exact PythonAnywhere WSGI configuration should be documented from the live account.

## Required Environment Variables

- `SECRET_KEY`
- `MAIL_USERNAME`, if contact email is used
- `MAIL_PASSWORD`, if contact email is used

Do not rely on the fallback Flask secret key in production.

## Configuration Risks

### Hard-coded API origin

`app/src/config/config.js` exports the production PythonAnywhere URL directly. Replace this with build-time or same-origin configuration so local and production builds do not require source edits.

### Contact email

Flask-Mail is configured for Gmail SMTP. Confirm:

- App-password or provider requirements.
- Sender address.
- Recipient address.
- Error handling.
- No credentials in source control.

### SQLite

Confirm:

- Database path and file permissions.
- Backup process.
- Behaviour during deployments.
- Whether admin changes persist across reloads and deployments.

## Deployment Checklist

- [ ] Frontend tests pass.
- [ ] Frontend production build passes.
- [ ] Backend tests pass.
- [ ] `SECRET_KEY` is set securely.
- [ ] Debug mode is off.
- [ ] Contact credentials are configured if required.
- [ ] Contact failure does not return false success.
- [ ] Admin login works.
- [ ] Protected pantry endpoints reject guests.
- [ ] Static assets and React routes load directly.
- [ ] Unknown React routes show the designed 404 page.
- [ ] Database is backed up before schema changes.

## Rollback

- Keep the previous known-good code revision available.
- Back up the SQLite database before deployment.
- Revert the faulty code revision.
- Restore the database only when a migration or data change requires it.
- Smoke-test public and admin surfaces after rollback.
