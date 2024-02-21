describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase')
  })

  it('should display a success message', () => {
    cy.intercept('POST', '/newsletter*', {
      statusCode: 201,
      body: { message: 'Thanks for signing up' },
    }).as('submitNewsletter')
    cy.visit('/')
    cy.get('[data-cy="newsletter-email"]').type('test@example.com')
    cy.get('[data-cy="newsletter-submit"]').click()
    cy.wait('@submitNewsletter')
    cy.contains('Thanks for signing up')
  })

  it('should display validation errors', () => {
    cy.intercept('POST', '/newsletter*', { message: 'Email exists already' }).as('submitNewsletter')
    cy.visit('/')
    cy.get('[data-cy="newsletter-email"]').type('test@example.com')
    cy.get('[data-cy="newsletter-submit"]').click()
    cy.wait('@submitNewsletter')
    cy.contains('Email exists already')
  })

  it('should successfully create a new contact', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: { email: 'test@example.com' },
      form: true,
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})
