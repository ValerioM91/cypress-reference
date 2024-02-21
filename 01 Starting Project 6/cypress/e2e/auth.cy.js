describe('auth', () => {
  beforeEach(() => {
    cy.task('seedDatabase')
  })

  it('should sign up', () => {
    cy.login()
  })

  it('should login', () => {
    cy.visit('/login')
    cy.get('[data-cy="auth-email"]').type('test@example.com')
    cy.get('[data-cy="auth-password"]').type('testpassword')
    cy.get('[data-cy="auth-submit"]').click()
    cy.location('pathname').should('eq', '/takeaways')
    cy.getCookie('__session').should('exist').its('value').should('not.be.empty')
  })

  it('should logout', () => {
    cy.login()

    cy.contains('Logout').click()
    cy.location('pathname').should('eq', '/')
    cy.getCookie('__session').its('value').should('be.empty')
  })
})
