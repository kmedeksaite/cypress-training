# :test_tube: Testing Tips

These are a few tips to keep in mind while writing test cases for Cypress. Please, feel free to add more over time.

**Do these:**
- DO use asyncData in your components if they are hydrating.

- DO wait for necessary API calls.

- DO navigate directly to pages instead of clicking on links when possible.

- DO use { failOnStatusCode: false } whenever calling cy.visit() with a route that is not statically generated (or to be safe on every call to cy.visit()).

**Do not do these:**
- DO NOT assume data from the back end will be in order; it can come back in different orders.

- DO NOT use selectors that depend on html structure (e.g. 'div > label') or styling (e.g. margin classes).

- DO NOT check for items being visible unless there is a specific reason to do so. If the items are offscreen, this will fail. Checking if the item exists is usually sufficient. If the item needs to be interacted with, cypress will automatically scroll to the item if needed.

- DO NOT directly compare or URL’s

- DO NOT assume that data is seeded the way you expect in the database.

- DO NOT use {multiple: true} on click unless you need to click multiple elements.

- DO NOT UNDER ANY CIRCUMSTANCES ever call cy.wait() with a number. This will ALWAYS generate a race condition. If a wait for an API is needed, use cy.route() or and wait for the API call.

- If a test fails, DO NOT JUST RERUN UNTIL THEY WORK and DO NOT PUSH. Figure out what went wrong (usually you'll need to add a 'wait' call or fix a selector), fix it, and test the fixed
test multiple times.

## Contributors

Special thanks to:
 - @DoctorLugubrious
 - @drew-royster