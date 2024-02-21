/// <reference types="cypress" />

describe('tasks page', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Add Task').click()

    cy.get('.backdrop').should('exist')
    cy.get('dialog.modal').should('exist')

    cy.get('.backdrop').click({ force: true })
    cy.get('.backdrop').should('not.exist')
    cy.get('dialog.modal').should('not.exist')

    cy.contains('Add Task').click()
    cy.get('dialog.modal').find('button').contains('Cancel').click()
    cy.get('.backdrop').should('not.exist')
    cy.get('dialog.modal').should('not.exist')
  })

  it('should add a task', () => {
    cy.visit('http://localhost:5173/')
    cy.get('button').contains('Add Task').click()
    cy.get('dialog.modal').find('#title').type('New Task')
    cy.get('dialog.modal').find('#summary').type('New Task Description')
    cy.get('dialog.modal').find('button').contains('Add Task').click()
    cy.get('.task').should('have.length', 1)
    cy.get('h2').contains('New Task')
    cy.get('p').contains('New Task Description')
  })

  it('should validate inputs', () => {
    cy.visit('http://localhost:5173/')
    cy.get('button').contains('Add Task').click()
    cy.get('dialog.modal').find('button').contains('Add Task').click()
    cy.get('dialog.modal').find('p.error-message').contains('Please provide values')
  })

  it('should filter tasks', () => {
    cy.visit('http://localhost:5173/')
    cy.get('button').contains('Add Task').click()
    cy.get('dialog.modal').find('#title').type('New Task')
    cy.get('dialog.modal').find('#summary').type('New Task Description')
    cy.get('dialog.modal').find('#category').select('urgent')
    cy.get('dialog.modal').find('button').contains('Add Task').click()
    cy.get('.task').should('have.length', 1)
    cy.get('#filter').select('urgent')
    cy.get('.task').should('have.length', 1)
    cy.get('#filter').select('moderate')
    cy.get('.task').should('have.length', 0)
    cy.get('#filter').select('all')
    cy.get('.task').should('have.length', 1)
  })

  it('should add multiple tasks', () => {
    cy.visit('http://localhost:5173/')
    cy.get('button').contains('Add Task').click()
    cy.get('dialog.modal').find('#title').type('First Task')
    cy.get('dialog.modal').find('#summary').type('New Task Description')
    cy.get('dialog.modal').find('button').contains('Add Task').click()
    cy.get('.task').should('have.length', 1)

    cy.get('button').contains('Add Task').click()
    cy.get('dialog.modal').find('#title').type('Second Task')
    cy.get('dialog.modal').find('#summary').type('New Task Description')
    cy.get('dialog.modal').find('button').contains('Add Task').click()
    cy.get('.task').should('have.length', 2)
    cy.get('.task').first().contains('First Task')
    cy.get('.task').eq(1).contains('Second Task')
  })
})
