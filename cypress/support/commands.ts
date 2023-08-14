// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// BE SURE TO ADD THESE TO INDEX.D.TS

Cypress.Commands.add('playVideo', () => {
  cy.get('#fluid-player-e2e-case_fluid_state_button').click();
});

Cypress.Commands.add('interceptVast', (vastFile, fixtureFile) => {
  cy.intercept('GET', `/static/${vastFile}.xml`, { fixture: `${vastFile}/${fixtureFile}.xml` });
});

Cypress.Commands.add('loadFluidPlayer', (configuration, target = "fluid-player-e2e-case") => {
    cy.window().then(win => {
      return win.fluidPlayer(target, configuration);
    })
});
