# Glossary

## Admin area

The server-rendered Flask/Jinja administration interface used by authenticated administrators to manage application data.

## API

The JSON routes exposed by Flask, primarily under `/api`, and consumed by the React application.

## Batch endpoint

An API route that accepts several related items in one request and processes them in one database transaction.

## CSRF

Cross-Site Request Forgery protection. Flask-WTF provides a token that state-changing requests must send where required.

## Deployment branch

The `production` Git branch. A push to this branch triggers the automated GitHub Actions deployment to PythonAnywhere.

## E2E test

An end-to-end browser test that exercises the application through user-visible routes and controls across frontend/backend boundaries. FlaskCart uses Playwright for this layer.

## Generated static commit

The current GitHub Actions commit that writes a freshly built React `server/static` bundle back to `production`. It is functional but causes remote branch movement that can leave local `production` behind.

## Pantry

The stored list of food items and their current stock quantities.

## Playwright

The browser automation/test framework installed under `app` for FlaskCart E2E regression coverage. The current generated demo spec validates Playwright itself but is not yet FlaskCart coverage.

## Production database

The SQLite data used by the live PythonAnywhere application. It currently lives at `server/app.db`; because that file is tracked by Git, deployment persistence is an unresolved risk.

## Public application

The React single-page application used by ordinary visitors.

## PythonAnywhere

The current hosting platform for the live FlaskCart application.

## Recipe

A record containing recipe metadata plus related ingredients, instructions and tags.

## Recipe slug

A URL-safe value derived from a recipe name and used by the React route `/recipes/:recipeSlug` to identify the recipe detail page.

## Recipe taxonomy

The controlled set of recipe categories such as Breakfast, Lunch and Dinner. These values should be normalised across database, API and UI.

## React route

A client-side path handled by React Router.

## Server route

A path handled directly by Flask, including API and admin routes.

## Shopping list

A persisted list of food items, quantities, units and purchased status.

## Source of truth

The authoritative state for a dataset. FlaskCart should avoid separate frontend state that no longer matches the backend.

## Optimistic update

Updating the UI before or immediately after a request. Optimistic changes must be rolled back or reconciled when a request fails.
