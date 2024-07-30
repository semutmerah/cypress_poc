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

Cypress.Commands.add('login', (username, password) => {
  cy.session('loginSession', () => {
    cy.visit('/')
    cy.get('.login_logo').should('be.visible')
    cy.get('[data-test="username"]').should('be.visible').type(username)
    cy.get('[data-test="password"]').should('be.visible').type(password)
    cy.get('#login-button').should('be.visible').should('not.be.disabled').click()

    cy.get('button').contains('Add to cart')
  }, {
    validate() {
      cy.document()
        .its('cookie')
        .should('contain', username)
      }
  })
})
