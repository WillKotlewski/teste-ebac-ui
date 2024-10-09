/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });
    
    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('willteste@teste.com')
        cy.get('#password').type('123')
        cy.get('.woocommerce-form > .button').click()
    
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, willteste (não é willteste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir o usuário inválido', () => {
        cy.get('#username').type('lalalala@teste.com')
        cy.get('#password').type('123')
        cy.get('.woocommerce-form > .button').click()
        //cy.get('.woocommerce-error > li').should('contain' , 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error > li').should('exist')
    });

    it('Deve exibit uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('willteste@teste.com')
        cy.get('#password').type('1234')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain' , 'Erro: A senha fornecida para o e-mail willlalala@teste.com está incorreta.')
        //cy.get('.woocommerce-error > li').should('exist')

    });

    it('Deve fazer login com sucesso usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
    
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, willteste (não é willteste? Sair)')
    });

    it.only('Deve fazer login com sucesso usando Fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha , {log: false})
            cy.get('.woocommerce-form > .button').click()
    
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, willteste (não é willteste? Sair)')
        })
    });

})