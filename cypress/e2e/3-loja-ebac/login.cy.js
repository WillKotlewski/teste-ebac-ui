/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });
    
    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('willlalala@teste.com')
        cy.get('#password').type('lalala123')
        cy.get('.woocommerce-form > .button').click()
    
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, willlalala (não é willlalala? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir o usuário inválido', () => {
        cy.get('#username').type('will@teste.com')
        cy.get('#password').type('lalala123')
        cy.get('.woocommerce-form > .button').click()
        //cy.get('.woocommerce-error > li').should('contain' , 'Endereço de e-mail desconhecido.')
        cy.get('.woocommerce-error > li').should('exist')
    });

    it('Deve exibit uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('willlalala@teste.com')
        cy.get('#password').type('teste000')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain' , 'Erro: A senha fornecida para o e-mail willlalala@teste.com está incorreta.')
        //cy.get('.woocommerce-error > li').should('exist')


    });


})