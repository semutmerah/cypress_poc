/// <reference types="cypress" />
// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('login feature', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    // cy.intercept('https://events.backtrace.io/api/*', req => req.destroy())
    // cy.visit('/', {failOnStatusCode: false})
    cy.visit('/')
    cy.get('.login_logo').should('be.visible')
  })

  it('successful login for standard_user', () => {
    const username = 'standard_user'
    const password = 'secret_sauce'

    cy.get('[data-test="username"]').should('be.visible').type(`${username}`)
    cy.get('[data-test="password"]').should('be.visible').type(`${password}`)
    cy.get('#login-button').should('be.visible').should('not.be.disabled').click()

    cy.get('button').contains('Add to cart')
  })

  it('successful login for performance_glitch_user', () => {
    const username = 'performance_glitch_user'
    const password = 'secret_sauce'

    cy.get('[data-test="username"]').should('be.visible').type(`${username}`)
    cy.get('[data-test="password"]').should('be.visible').type(`${password}`)
    cy.get('#login-button').should('be.visible').should('not.be.disabled').click()

    cy.get('button').contains('Add to cart')
  })

  it('failed login for locked_out_user', () => {
    const username = 'locked_out_user'
    const password = 'secret_sauce'

    cy.get('[data-test="username"]').should('be.visible').type(`${username}`)
    cy.get('[data-test="password"]').should('be.visible').type(`${password}`)
    cy.get('#login-button').should('be.visible').should('not.be.disabled').click()

    cy.get('.error-message-container.error').should('be.visible')
    cy.get('[data-test="error"]').should('be.visible').contains('Epic sadface: Sorry, this user has been locked out.')

    cy.get('[data-test="error-button"]').click()
    cy.get('[data-test="username"]').next('svg[data-icon="times-circle"]').should('not.exist')
    cy.get('[data-test="password"]').next('svg[data-icon="times-circle"]').should('not.exist')
    cy.get('[data-test="error-button"]').should('not.exist')
  })

  it('must provide password', () => {
    const username = 'standard_user'

    cy.get('[data-test="username"]').should('be.visible').type(`${username}`)
    cy.get('[data-test="password"]').should('be.visible')

    cy.get('#login-button').should('be.visible').should('not.be.disabled').click()

    cy.get('[data-test="username"]').next('svg[data-icon="times-circle"]').should('be.visible')
    cy.get('[data-test="password"]').next('svg[data-icon="times-circle"]').should('be.visible')
    cy.get('[data-test="error-button"]').should('be.visible')
    cy.get('[data-test="error"]').should('be.visible').contains('Epic sadface: Password is required')

    cy.get('[data-test="error-button"]').click()
    cy.get('[data-test="username"]').next('svg[data-icon="times-circle"]').should('not.exist')
    cy.get('[data-test="password"]').next('svg[data-icon="times-circle"]').should('not.exist')
    cy.get('[data-test="error-button"]').should('not.exist')
  })

  it('must provide username', () => {
    const password = 'secret_sauce'

    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible').type(`${password}`)

    cy.get('#login-button').should('be.visible').should('not.be.disabled').click()

    cy.get('[data-test="username"]').next('svg[data-icon="times-circle"]').should('be.visible')
    cy.get('[data-test="password"]').next('svg[data-icon="times-circle"]').should('be.visible')
    cy.get('[data-test="error-button"]').should('be.visible')
    cy.get('[data-test="error"]').should('be.visible').contains('Epic sadface: Username is required')

    cy.get('[data-test="error-button"]').click()
    cy.get('[data-test="username"]').next('svg[data-icon="times-circle"]').should('not.exist')
    cy.get('[data-test="password"]').next('svg[data-icon="times-circle"]').should('not.exist')
    cy.get('[data-test="error-button"]').should('not.exist')
  })

  it('must provide username and password', () => {
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')

    cy.get('#login-button').should('be.visible').should('not.be.disabled').click()

    cy.get('[data-test="username"]').next('svg[data-icon="times-circle"]').should('be.visible')
    cy.get('[data-test="password"]').next('svg[data-icon="times-circle"]').should('be.visible')
    cy.get('[data-test="error-button"]').should('be.visible')
    cy.get('[data-test="error"]').should('be.visible').contains('Epic sadface: Username is required')

    cy.get('[data-test="error-button"]').click()
    cy.get('[data-test="username"]').next('svg[data-icon="times-circle"]').should('not.exist')
    cy.get('[data-test="password"]').next('svg[data-icon="times-circle"]').should('not.exist')
    cy.get('[data-test="error-button"]').should('not.exist')

  })

})
