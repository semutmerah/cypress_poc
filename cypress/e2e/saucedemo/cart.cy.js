/// <reference types="cypress" />
// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('cart feature', () => {
  beforeEach(() => {
    const username = 'standard_user'
    const password = 'secret_sauce'

    cy.login(username, password)
  })

  it('successful add one item to cart from inventory page', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    cy.get('[data-test="shopping-cart-link"]').should('be.visible')

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible').click()
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible')
    cy.get('[data-test="shopping-cart-link"]').should('be.visible')
    cy.get('[data-test="remove-sauce-labs-bike-light"]').should('be.visible')
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('not.exist')

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').contains('Your Cart').should('be.visible')
    cy.get('[data-test="inventory-item"]').contains('Sauce Labs Bike Light').should('be.visible')
    cy.get('[data-test="inventory-item-price"]').should('be.visible')
    cy.get('[data-test="remove-sauce-labs-bike-light"]').should('be.visible')
    cy.get('[data-test="continue-shopping"]').should('be.visible')
    cy.get('[data-test="checkout"]').should('be.visible')
  })

  it('successful add one item to cart from single item page', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    cy.get('[data-test="shopping-cart-link"]').should('be.visible')

    cy.get('[data-test="item-1-title-link"]').contains('Sauce Labs Bolt T-Shirt').should('be.visible').click()
    cy.get('[data-test="back-to-products"]').should('be.visible')

    cy.get('[data-test="add-to-cart"]').should('be.visible').click()
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible')
    cy.get('[data-test="shopping-cart-link"]').should('be.visible')
    cy.get('[data-test="remove"]').should('be.visible')
    cy.get('[data-test="add-to-cart"]').should('not.exist')

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').contains('Your Cart').should('be.visible')
    cy.get('[data-test="inventory-item"]').contains('Sauce Labs Bolt T-Shirt').should('be.visible')
    cy.get('[data-test="inventory-item-price"]').should('be.visible')
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible')
    cy.get('[data-test="continue-shopping"]').should('be.visible')
    cy.get('[data-test="checkout"]').should('be.visible')
  })

})
