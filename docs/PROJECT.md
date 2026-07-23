# FlaskCart Project Definition

## Purpose

FlaskCart is a learning and portfolio project that demonstrates a full-stack recipe, pantry and shopping-list application using Flask, React and SQLite.

The project is intended to show portfolio reviewers practical skills in backend development, frontend development, API design, state management, authentication, database work, accessibility and deployment.

## Live Application

- Repository: `Skateallday/FlaskCart`
- Live demo: `https://skateallday.pythonanywhere.com/`
- Default branch: `master`

## Product Summary

FlaskCart has two connected application surfaces:

1. A public React single-page application for browsing recipes, viewing pantry stock, maintaining a shopping list and submitting contact enquiries.
2. A server-rendered Flask admin area for authenticated management of food and recipe data.

The React build is served by Flask in production and communicates with JSON API routes under `/api`.

## Target Users

### Primary audience

- Portfolio reviewers
- Potential employers
- Developers reviewing the implementation

### Application roles

- Public visitor: can browse recipes, pantry data and the shopping list.
- Admin user: can sign in through the Flask admin interface and manage application data.

The application is not intended for commercial grocery operations or real customer transactions.

## Current Capabilities

- Recipe listing with images, descriptions, servings, calories and cooking times.
- Recipe ingredients and instructions.
- Recipe category filter controls, although the recipe grid is not currently connected to them.
- Pantry inventory listing, filtering and search.
- Shopping-list storage and removal.
- Adding recipe ingredients to the shopping list.
- Flask session-based admin authentication.
- Admin forms for food and recipe management.
- Public deployment on PythonAnywhere.

## Goals

- Demonstrate a coherent full-stack architecture.
- Make every visible control perform the action it promises.
- Keep public and admin capabilities clearly separated.
- Provide reliable loading, error, success and empty states.
- Reduce unnecessary API requests and frontend work.
- Produce a responsive and accessible interface.
- Document API contracts, database structure and architectural decisions.
- Keep the code understandable for a portfolio review.

## Non-Goals

The current project does not aim to:

- Process real payments.
- Handle shipping, tax, refunds or fulfilment.
- Store payment card data.
- Support enterprise traffic or high availability.
- Provide multi-tenant account management.
- Become a production grocery service without a separate scope decision.

## Success Criteria

The project is successful when a reviewer can:

1. Use the live demo without encountering misleading or dead controls.
2. Browse and filter recipes.
3. inspect recipe ingredients and instructions without duplicate request storms.
4. Add recipe ingredients to the shopping list and see the UI update immediately.
5. Manage pantry and shopping-list data with clear permissions and feedback.
6. Submit a contact enquiry and receive an honest success or error result.
7. Use the application on mobile and desktop.
8. Navigate the application using a keyboard and assistive technology landmarks.
9. Understand the public React app, Flask API, admin interface and SQLite data model from the documentation.
10. Run relevant tests and a production frontend build successfully.

## Constraints

- Backend: Flask 2.2.5 and SQLite.
- Frontend: React 19, React Router 6 and JavaScript.
- Build system: Create React App 5 until a deliberate migration is approved.
- Styling: Tailwind utilities and existing CSS; the Tailwind version conflict must be resolved.
- Deployment: PythonAnywhere.
- Package management: `pip` and `npm`.
- The project should remain approachable as a learning project.
