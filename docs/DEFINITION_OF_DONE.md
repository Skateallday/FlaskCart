# Definition of Done

A task is complete only when all applicable items are satisfied.

## Behaviour

- [ ] The visible control performs the promised action.
- [ ] Acceptance criteria in `TASKS.md` are met.
- [ ] Success, loading, empty and failure states are handled.
- [ ] Successful backend changes appear in the UI without refresh.
- [ ] Unauthorised behaviour is hidden or clearly explained.
- [ ] Existing related behaviour still works.

## Validation and Security

- [ ] Client input is validated where useful.
- [ ] Server input is validated authoritatively.
- [ ] Negative stock and invalid quantities are rejected.
- [ ] Protected routes require an authenticated session.
- [ ] No secrets or personal data are committed or logged.
- [ ] Contact success is returned only after the chosen delivery/persistence action succeeds.

## Code Quality

- [ ] The change is focused.
- [ ] Naming matches the API schema.
- [ ] No unrelated refactor is included.
- [ ] Temporary logs and debugging code are removed.
- [ ] Repeated fetch/error logic is not duplicated unnecessarily.

## Testing

- [ ] A regression test covers the repaired bug where practical.
- [ ] Relevant backend tests pass.
- [ ] Relevant frontend unit/component tests pass.
- [ ] Relevant FlaskCart Playwright E2E tests pass when that workflow has E2E coverage.
- [ ] Generated/demo Playwright tests are not cited as proof of FlaskCart behaviour.
- [ ] No mutating browser test targets production data.
- [ ] `npm run build` passes for frontend changes.
- [ ] The changed workflow is manually smoke-tested.
- [ ] Authentication success and failure paths are checked when relevant.

## Responsive and Accessible UI

- [ ] The change works at mobile and desktop widths.
- [ ] Buttons retain visible or accessible names.
- [ ] Keyboard operation is checked.
- [ ] Focus is visible.
- [ ] Correct semantic elements and ARIA relationships are used.

## Documentation

- [ ] `API.md` is updated for API changes.
- [ ] `DATABASE.md` is updated for schema changes.
- [ ] `SECURITY.md` is updated for auth or personal-data changes.
- [ ] `CHANGELOG.md` records notable user-visible changes.
- [ ] `TASKS.md` is updated.
- [ ] Significant choices are recorded in `DECISIONS.md`.

## Review Readiness

- [ ] The commit or pull request explains what changed and why.
- [ ] Screenshots are included for visible changes.
- [ ] Test commands and results are recorded honestly.
- [ ] Known limitations are documented.
