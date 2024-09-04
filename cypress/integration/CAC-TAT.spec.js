/// <reference types="Cypress"/>

describe ('Central de Atendimento ao Cliente TAT', function(){
    beforeEach (function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação',function() {

        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia formulário',function(){

        cy.get('#firstName').type('Fabio')
        cy.get('#lastName').type('Soares')
        cy.get('#email').type('fabiojuniorfv1@gmail.com')
        cy.get('#open-text-area').type('teste',{delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')  
    })

    it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function(){

        cy.get('#firstName').type('Fabio')
        cy.get('#lastName').type('Soares')
        cy.get('#email').type('fabiojuniorfv1@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')  
    })

    it('Campo de telefone continua vazia quando preenchido com String', function(){

        cy.get('#phone')
            .type('testeString')
            .should('have.value', '')

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio do formulario', function(){

        cy.get('#firstName').type('Fabio')
        cy.get('#lastName').type('Soares')
        cy.get('#email').type('fabiojuniorfv1@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')  

    })

    it('Preenche e limpa os campos nome, sobrenome, email, e telefone',function(){

        cy.get('#firstName').type('Fabio')
            .should('have.value', 'Fabio')
            .clear().should('have.value', '')

        cy.get('#lastName').type('Soares')
            .should('have.value', 'Soares')
            .clear().should('have.value', '')

        cy.get('#email').type('fabiojuniorfv1@gmail.com')
            .should('have.value', 'fabiojuniorfv1@gmail.com')
            .clear().should('have.value', '')

        cy.get('#phone').type(8398113483)
        .should('have.value', 8398113483)
        .clear().should('have.value', '')

    })

        

})