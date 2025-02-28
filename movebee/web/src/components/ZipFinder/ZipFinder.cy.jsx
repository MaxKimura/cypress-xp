import React from 'react'
import ZipFinder from './ZipFinder'

describe('<ZipFinder />', () => {

  beforeEach(() => {
    cy.mount(<ZipFinder />)
    cy.get('[data-cy="inputCep"]').as('inputCep')
    cy.get('[data-cy="submitCep"]').as('submitCep')
  })

  it('Deve buscar um cep na área de cobertura', () => {

    const address = {
      street: 'Rua Joaquim Floriano',
      district: 'Itaim Bibi',
      city: 'São Paulo/SP',
      zipcode: '04534-011',
    }

    cy.zipFind(address, true)

    cy.get('[data-cy=logradouro]').should('have.text', address.street)
    cy.get('[data-cy=bairro]').should('have.text', address.district)
    cy.get('[data-cy=cidade_uf]').should('have.text', address.city)
    cy.get('[data-cy=cep]').should('have.text', address.zipcode)
  })

  it('cep deve ser obrigatório', () => {
    cy.mount(<ZipFinder />)
    cy.get('@submitCep').click()

    cy.on('window:alert', (text) => {
      expect(text).to.equal('Preencha algum CEP')
    })

    cy.get('#swal2-title').should('have.text', 'Preencha algum CEP')

    cy.get('.swal2-confirm').click({force:true})
  })

  it('cep invalido', () => {
    const address = { zipcode: '0000000' }

    cy.zipFind(address)

    cy.get('[data-cy="notice"]')
      .should('be.visible')
      .and('have.text', 'CEP no formato inválido.')
  })

  it('cep fora da área de cobertura', () => {
    const zipcode = '06150000'
    cy.get('@inputCep').clear()
    cy.get('@inputCep').type(zipcode)
    cy.get('@submitCep').click()

    cy.get('[data-cy="notice"]')
      .should('be.visible')
      .and('have.text', 'No momento não atendemos essa região.')
  })
})

Cypress.Commands.add('zipFind', (address, mock = false) => {
  if(mock) {
    cy.intercept('GET', '/zipcode/*', {
      statusCode: 200,
      body: {
        cep: address.zipcode,
        logradouro: address.street,
        cidade_uf: address.city,
        bairro: address.district
      }
    }).as('getZipCode')
  }

  cy.get('@inputCep').type(address.zipcode)
  cy.get('@submitCep').click({force: true})

  if(mock) {
    cy.wait('@getZipCode')
  }
  
})

// aula  20 - 19:49