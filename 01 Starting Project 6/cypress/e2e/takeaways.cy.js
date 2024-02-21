/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase')
  })

  it('should display a list of fetched takeaways', () => {
    cy.visit('/')
    cy.get('[data-cy="takeaway-item"]').should('exist')
  })

  it('should add a new takeaway', () => {
    cy.intercept('POST', '/takeaways/new*', 'success').as('createTakeaway')
    cy.login()
    cy.visit('/takeaways/new')
    cy.get('[data-cy="title"]').type('testtitle')
    cy.get('[data-cy="body"]').type('testbody')
    cy.get('[data-cy="create-takeaway"]').click()
    cy.wait('@createTakeaway')
      .its('request.body')
      .should('match', /testtitle.*testbody/)
  })
})
