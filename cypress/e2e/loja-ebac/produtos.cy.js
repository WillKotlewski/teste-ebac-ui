/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Aether Gym Pant')
        cy.get('#tab-title-description > a').should('exist')

    });
    
    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Abominable Hoodie'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)

    });

    it('Deve visitar a página do produto', () => {
    //produtosPage.visitarProduto('Zeppelin-Yoga-Pant')

    produtosPage.visitarProduto('Zeppelin Yoga Pant')
    cy.get('.product_title').should('contain', 'Zeppelin Yoga Pant')

    });

    it('Deve adicionar produto ao carrinho', () => {
        let quantidade = 7
        produtosPage.buscarProduto('Aero Daily Fitness Tee')
        produtosPage.addProdutoCarrinho('XS', 'Black', quantidade)

        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Aero Daily Fitness Tee” foram adicionados no seu carrinho.')
    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
        
        produtosPage.buscarProduto(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[1].tamanho, dados[1].cor, dados[1].quantidade)

        cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
        })
    })
})