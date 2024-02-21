/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.clock()
    cy.fixture('location.json').as('location')
    cy.get('@location').then((loc) => {
      cy.visit('/').then((win) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .as('getUserPosition')
          .callsFake((cb) => {
            setTimeout(() => {
              cb(loc)
            }, 100)
          })
        cy.stub(win.navigator.clipboard, 'writeText').as('saveToClipboard').resolves()
        cy.spy(win.localStorage, 'setItem').as('saveToLocalStorage')
        cy.spy(win.localStorage, 'getItem').as('getFromLocalStorage')
      })
    })
  })

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click()
    cy.get('@getUserPosition').should('be.calledOnce')
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled')
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched')
  })

  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe')
    cy.get('[data-cy="get-loc-btn"]').click()
    cy.get('[data-cy="share-loc-btn"]').click()
    cy.get('@saveToClipboard').should('be.calledOnce')
    cy.get('@location').then(({ coords: { latitude, longitude } }) => {
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
      )
      cy.get('@saveToLocalStorage').should('be.calledOnce')
      cy.get('@saveToLocalStorage').should(
        'have.been.calledWithMatch',
        /John Doe/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
      )
      cy.get('[data-cy="share-loc-btn"]').click()
      cy.get('@getFromLocalStorage').should('have.been.called')
      cy.get('[data-cy="info-message"]').should('be.visible')
      cy.tick(2000)
      cy.get('[data-cy="info-message"]').should('not.be.visible')
    })
  })
})
