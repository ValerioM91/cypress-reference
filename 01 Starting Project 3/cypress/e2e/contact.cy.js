/// <reference types="cypress" />

describe('contact form', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('should submit the form', () => {
    // cy.getById("contact-btn-submit").then((btn) => {
    //   expect(btn).to.not.have.attr('disabled')
    // })
    cy.getById('contact-btn-submit')
      .as('submitBtn')
      .contains('Send Message')
      .should('not.have.attr', 'disabled')

    cy.screenshot()

    cy.getById('contact-input-message').type('hello there')
    cy.getById('contact-input-name').type('John Doe')
    cy.getById('contact-input-email').type('text@example.com{enter}')
    // cy.get('@submitBtn').click()
    cy.get('@submitBtn').contains('Sending...').should('have.attr', 'disabled')
  })

  it('should display validate input field', () => {
    cy.submitForm()
    cy.getById('contact-btn-submit').contains('Send Message', { timeout: 0 })

    cy.getById('contact-input-message').focus().blur()
    cy.getById('contact-input-message')
      .parent('p')
      .should('have.attr', 'class')
      .and('match', /invalid/)

    cy.getById('contact-input-name').focus().blur()
    cy.getById('contact-input-name')
      .parent('p')
      .should('have.attr', 'class')
      .and('match', /invalid/)

    cy.getById('contact-input-email').focus().blur()
    cy.getById('contact-input-email')
      .parent('p')
      .should('have.attr', 'class')
      .and('match', /invalid/)
  })
})
