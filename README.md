# FlaskCart

FlaskCart is a full-stack learning and portfolio application built with Flask, React and SQLite. It combines recipe browsing, pantry inventory, a shopping list, contact enquiries and an authenticated admin area in one deployed project.

## Live Demo

`https://skateallday.pythonanywhere.com/`

## What It Demonstrates

- React single-page application development.
- Flask JSON APIs and server-rendered admin pages.
- SQLite persistence and relational data handling.
- Session-based admin authentication and CSRF protection.
- Frontend state management and API integration.
- Responsive recipe and pantry interfaces.
- Contact enquiry persistence plus email notification handling.
- Browser automation tooling with Playwright.
- Automated deployment to PythonAnywhere with GitHub Actions.

## Current Features

- Recipe library with search and category filtering.
- Responsive one/two/three-column recipe cards.
- Dedicated `/recipes/:recipeSlug` detail pages.
- Ingredients and ordered cooking instructions.
- Three-recipe homepage preview.
- Pantry search/filter UI with desktop table and mobile cards.
- Shopping-list persistence and removal.
- Contact form with client/server validation and SQLite persistence.
- Flask/Jinja admin interface with session authentication.
- Automatic production deployment from the `production` branch.

Some pantry, shopping-list, admin verification, accessibility and regression-test work remains. See `TASKS.md` and `NEXT_STEPS.md` for the current backlog.

## Built With

### Backend

- Python
- Flask 2.2.5
- SQLite
- Flask-Bcrypt
- Flask-Mail
- Flask-WTF / WTForms
- Flask blueprints and JSON routes

FlaskCart does **not** currently use Flask-RESTful resources.

### Frontend

- React 19
- React Router 6
- JavaScript
- Create React App / react-scripts 5
- Tailwind CSS utilities
- React Toastify

### Testing and Tooling

- Testing Library dependencies
- Playwright 1.62.1
- Git and GitHub
- GitHub Actions
- Docker for the current Playwright browser-test workflow on Windows

## Getting Started

### Backend

```bash
cd server
python -m venv venv
```

Activate the environment, then:

```bash
pip install -r requirements.txt
python app.py
```

Flask CLI alternative:

```bash
flask --app app run --debug
```

### Frontend

```bash
cd app
npm install
npm start
```

When the React app runs on `localhost` or `127.0.0.1`, it uses the local Flask API at `http://localhost:5000`. Production uses same-origin API requests.

## Testing

Frontend unit/component tooling is available through Create React App:

```bash
cd app
npm test
npm run build
```

Playwright is installed and its generated demo suite has been verified across Chromium, Firefox and WebKit. Those generated tests target Playwright's own site and are not yet FlaskCart regression tests.

See `TESTING.md` for the current Docker commands and coverage plan.

## Deployment

Normal releases follow this branch flow:

```powershell
git checkout master
git pull origin master

git checkout production
git pull origin production
git merge master
git push origin production

git checkout master
```

Pushing `production` triggers GitHub Actions, which builds the React app, deploys the repository to PythonAnywhere, verifies the deployed commit and reloads the live application.

Normal releases should not require logging into PythonAnywhere.

See `DEPLOYMENT.md` for the full process and the remaining production-database risk.

## Project Documentation

The project documentation records the current implementation and backlog:

- `PROJECT.md` — scope and success criteria.
- `TASKS.md` — completed and outstanding work.
- `NEXT_STEPS.md` — immediate sequence.
- `ARCHITECTURE.md` — application structure and data flow.
- `API.md` — current API contracts.
- `DATABASE.md` — data model and integrity notes.
- `TESTING.md` — regression strategy and verified commands.
- `DEPLOYMENT.md` — production release process.
- `KNOWN_ISSUES.md` — confirmed open problems.
- `DECISIONS.md` — architectural and workflow decisions.

## Project Status

FlaskCart remains an active learning/portfolio project. Contact and core recipe flows are substantially improved; inventory, shopping-list, global routing, admin verification, test coverage and production SQLite safety remain the main unfinished areas.
