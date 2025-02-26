

import data from '../fixtures/orphanages.json'

import { generator } from '../support/factory'

describe('Cadastro de orfanatos', () => {

    it('deve cadastrar um novo orfanato', () => {

        const orphanage = generator()

        cy.goToCreate(orphanage.position)

        cy.registerPageValidation('Cadastro')
  
        cy.createOrphanages(orphanage)

        cy.popUpHaveText('Orfanato cadastrado com sucesso.')
    })

    it('não deve cadastrar orfanato duplicado', () => {
        const orphanage = generator()

        cy.postOrphanage(orphanage)

        cy.goToCreate(orphanage.position)

        cy.registerPageValidation('Cadastro')

        cy.createOrphanages(orphanage)

        cy.popUpHaveText('Já existe um cadastro com o nome: ' + orphanage.name)
    })

    context('Campos obrigatórios', ()=> {
      it('não deve cadastrar se os campos obrigatórios não forem preenchidos', () => {
        let orphanage = generator()
  
        delete orphanage.name
        delete orphanage.description
        delete orphanage.image
        delete orphanage.opening_hours
  
        cy.visitWithMockGeolocarions('/orphanages/create')
  
        cy.registerPageValidation('Cadastro')
  
        cy.createOrphanages(orphanage)
  
        cy.alertHaveText('Nome','Campo obrigatório')
        cy.alertHaveText('Sobre','Campo obrigatório')
        cy.alertHaveText('Fotos','Envie pelo menos uma foto')
        cy.alertHaveText('Horário','Campo obrigatório')
  
      })

      it('não deve cadastrar se nome nao for preenchido', () => {
        let orphanage = generator()
  
        delete orphanage.name
  
        cy.visitWithMockGeolocarions('/orphanages/create')
  
        cy.registerPageValidation('Cadastro')
  
        cy.createOrphanages(orphanage)
  
        cy.alertHaveText('Nome','Campo obrigatório')
      })

      it('não deve cadastrar se descrição nao for preenchida', () => {
        let orphanage = generator()
  
        delete orphanage.description

        cy.visitWithMockGeolocarions('/orphanages/create')
  
        cy.registerPageValidation('Cadastro')
  
        cy.createOrphanages(orphanage)

        cy.alertHaveText('Sobre','Campo obrigatório')
      })

      it('não deve cadastrar se imagem nao for anexada', () => {
        let orphanage = generator()

        delete orphanage.image
  
        cy.visitWithMockGeolocarions('/orphanages/create')
  
        cy.registerPageValidation('Cadastro')
  
        cy.createOrphanages(orphanage)
  
        cy.alertHaveText('Fotos','Envie pelo menos uma foto')
      })

      it('não deve cadastrar se horario nao for preenchido', () => {
        let orphanage = generator()

        delete orphanage.opening_hours
  
        cy.visitWithMockGeolocarions('/orphanages/create')
  
        cy.registerPageValidation('Cadastro')
  
        cy.createOrphanages(orphanage)

        cy.alertHaveText('Horário','Campo obrigatório')
  
      })
    })

})


  //aula 17 1h 09m