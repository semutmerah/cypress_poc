/// <reference types="cypress" />
// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('sort feature', () => {
  beforeEach(() => {
    cy.fixture("credentials").then(cred => {
      cy.login(cred.username, cred.password)
    })
  })

  it('able to sort price (low to high)', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.get('[data-test="product-sort-container"]')
      .select('Price (low to high)')
    cy.get('[data-test="product-sort-container"]')
      .should('have.value', 'lohi')

    // Assert the sort is correct
    // Create an empty array to store the prices
    let prices = [];

    // Find all elements with the data-test attribute and extract their text
    cy.get('[data-test="inventory-item-price"]').each(($el) => {
      // Push the text content of each element to the prices array
      prices.push($el.text().replace('$', '')); // Remove the dollar sign
    }).then(() => {
      // Convert prices to numbers
      let numericPrices = prices.map(price => parseFloat(price));

      // Check that the array is sorted
      for (let i = 0; i < numericPrices.length - 1; i++) {
        expect(numericPrices[i]).to.be.at.most(numericPrices[i + 1]);
      }
    })
  })

  it('able to sort price (high to low)', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.get('[data-test="product-sort-container"]')
      .select('Price (high to low)')
    cy.get('[data-test="product-sort-container"]')
      .should('have.value', 'hilo')
    
    // Assert the sort is correct
    // Create an empty array to store the prices
    let prices = [];

    // Find all elements with the data-test attribute and extract their text
    cy.get('[data-test="inventory-item-price"]').each(($el) => {
      // Push the text content of each element to the prices array
      prices.push($el.text().replace('$', '')); // Remove the dollar sign
    }).then(() => {
      // Convert prices to numbers
      let numericPrices = prices.map(price => parseFloat(price));

      // Check that the array is sorted
      for (let i = 0; i < numericPrices.length - 1; i++) {
        expect(numericPrices[i]).to.be.at.least(numericPrices[i + 1]);
      }
    })
  })

  it('able to sort by name alphabetically (A to Z)', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.get('[data-test="product-sort-container"]')
      .select('Name (A to Z)')
    cy.get('[data-test="product-sort-container"]')
      .should('have.value', 'az')

    // Assert the sort is correct
    // Create an empty array to store the names
    let names = [];

    // Find all elements with the data-test attribute and extract their text
    cy.get('[data-test="inventory-item-name"]').each(($el) => {
      // Push the text content of each element to the names array
      names.push($el.text());
    }).then(() => {
      // Check that the names array is sorted alphabetically
      for (let i = 0; i < names.length - 1; i++) {
        expect(names[i].localeCompare(names[i + 1])).to.be.at.most(0);
      }
    })
  })

  it('able to sort by name in reverse (Z to A)', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.get('[data-test="product-sort-container"]')
      .select('Name (Z to A)')
    cy.get('[data-test="product-sort-container"]')
      .should('have.value', 'za')

    // Assert the sort is correct
    // Create an empty array to store the names
    let names = [];

    // Find all elements with the data-test attribute and extract their text
    cy.get('[data-test="inventory-item-name"]').each(($el) => {
      // Push the text content of each element to the names array
      names.push($el.text());
    }).then(() => {
      // Check that the names array is sorted alphabetically
      for (let i = 0; i < names.length - 1; i++) {
        expect(names[i].localeCompare(names[i + 1])).to.be.at.least(0);
      }
    })
  })
})
