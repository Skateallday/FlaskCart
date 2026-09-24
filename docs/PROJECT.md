# FlaskCart Project Definition

## Purpose

FlaskCart is a learning and portfolio project that demonstrates a full-stack recipe, pantry and shopping-list application using Flask, React and SQLite.

The project is intended to show portfolio reviewers practical skills in backend development, frontend development, API design, state management, authentication, database work, accessibility, testing and deployment.

## Live Application

- Repository: `Skateallday/FlaskCart`
- Live demo: `https://skateallday.pythonanywhere.com/`
- Default development branch: `master`
- Deployment branch: `production`

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

- Public visitor: can browse recipes, pantry data and the shopping list and can submit contact enquiries.
- Admin user: can sign in and manage protected application data.

The application is not intended for commercial grocery operations or real customer transactions.

## Current Capabilities

- Responsive recipe listing with images, descriptions, servings, calories and cooking times.
- Recipe search and category filtering with result counts and clear-filter controls.
- Dedicated slug-based recipe pages with ingredients and ordered instructions.
- A three-recipe homepage preview linking to the full recipe library.
- Pantry inventory listing, filtering/search, desktop table and mobile-card presentation.
- Shopping-list storage and removal, with several interaction/state improvements still outstanding.
- Adding recipe ingredients to the shopping list, with state/batch behaviour still to be improved.
- Contact enquiries persisted to SQLite with email notification outcome handling.
- Flask session-based admin authentication.
- Admin forms for food and recipe management.
- Public deployment on PythonAnywhere.
- Automated production deployment through GitHub Actions.
- Playwright browser-test tooling, with FlaskCart-specific E2E tests still to be added.

## Current Project Status — 2026-09-24

Completed areas include the contact workflow, core recipe filtering/search, dedicated recipe pages, responsive recipe layout, homepage recipe limiting, major public UI refresh work, Playwright tooling setup and deployment hardening.

Priority 1 is not complete. Inventory state/authentication, shopping-list interactions, the global React 404, admin edit/delete verification and regression coverage remain open. Production SQLite persistence during deployment is also an explicit operational risk.

## Goals

- Demonstrate a coherent full-stack architecture.
- Make every visible control perform the action it promises.
- Keep public and admin capabilities clearly separated.
- Provide reliable loading, error, success and empty states.
- Reduce unnecessary API requests and frontend work.
- Produce a responsive and accessible interface.
- Document API contracts, database structure, deployment and architectural decisions.
- Keep the code understandable for a portfolio review.
- Keep deployments simple and automated from the repository.

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
2. Browse, search and filter recipes.
3. Open a dedicated recipe URL and inspect ingredients and instructions without per-card duplicate request storms.
4. Add recipe ingredients to the shopping list and see the UI update immediately.
5. Manage pantry and shopping-list data with clear permissions and feedback.
6. Submit a contact enquiry and receive an honest success or error result.
7. Use the application on mobile and desktop.
8. Navigate the application using a keyboard and assistive technology landmarks.
9. Understand the public React app, Flask API, admin interface, SQLite data model and deployment flow from the documentation.
10. Run relevant tests and a production frontend build successfully.
11. Deploy a normal release by merging `master` to `production` and pushing, without manually logging into PythonAnywhere.

## Constraints

- Backend: Flask 2.2.5 and SQLite.
- Frontend: React 19, React Router 6 and JavaScript.
- Build system: Create React App 5 until a deliberate migration is approved.
- Styling: Tailwind utilities and existing CSS; the Tailwind version conflict remains to be resolved.
- Deployment: PythonAnywhere through GitHub Actions.
- Package management: `pip` and `npm`.
- The project should remain approachable as a learning project.
