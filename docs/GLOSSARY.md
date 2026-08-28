# Glossary

## Admin area

The server-rendered Flask/Jinja interface used by authenticated administrators to manage food and recipe data.

## API

The JSON routes exposed by Flask, primarily under `/api`, and consumed by the React application.

## Batch endpoint

An API route that accepts several related items in one request and processes them in one database transaction.

## CSRF

Cross-Site Request Forgery protection. Flask-WTF provides a token that state-changing requests must send.

## Pantry

The stored list of food items and their current stock quantities.

## Public application

The React single-page application used by ordinary visitors.

## Recipe

A record containing recipe metadata plus related ingredients, instructions and tags.

## Recipe taxonomy

The controlled set of recipe categories such as Breakfast, Lunch and Dinner. These values must be normalised across database, API and UI.

## Shopping list

A persisted list of food items, quantities, units and purchased status.

## Source of truth

The authoritative state for a dataset. FlaskCart should avoid separate frontend state that no longer matches the backend.

## Optimistic update

Updating the UI before or immediately after a request. Optimistic changes must be rolled back or reconciled when a request fails.

## PythonAnywhere

The current hosting platform for the live FlaskCart application.

## React route

A client-side path handled by React Router.

## Server route

A path handled directly by Flask, including API and admin routes.
