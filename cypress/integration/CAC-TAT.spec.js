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
        cy.contains('button','Enviar').click()

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
        cy.get('#phone-checkbox').check()
            .should('be.checked')
        cy.get('#open-text-area').type('teste')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')  

    })

    it('Preenche e limpa os campos nome, sobrenome, email, texto, e telefone',function(){

        cy.get('#firstName')
            .type('Fabio')
            .should('have.value', 'Fabio')
            .clear().should('have.value', '')

        cy.get('#lastName')
            .type('Soares')
            .should('have.value', 'Soares')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('fabiojuniorfv1@gmail.com')
            .should('have.value', 'fabiojuniorfv1@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type(8398113483)
            .should('have.value', 8398113483)
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('teste')
            .should('have.value','teste')
            .clear()
            .should('have.value', '')
    })

    it('Exibe Mensagem de erro ao Submeter o Formulario sem preencher os campos obrigatorios', function(){

        cy.get('#phone').type(83981134183)
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type ('teste sem preencher os campos obrigatorios ')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')  

    })

    it('Envia formulario com sucesso usando um comando customizado',function (){
        cy.fillMandatoryFieldAndSubmit()

        cy.get('.success').should('be.visible')  


    })

    it('Seleciona um produto (youtube) por texto', function(){

        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube') 
    })

    it('Seleciona um produto (youtube) pelo value', function(){

        cy.get('#product')
            .select('youtube')
            .should('have.value','youtube') 
    })

    it('Seleciona um produto (youtube) por Indice', function(){

        cy.get('select')
            .select(4)
            .should('have.value','youtube') 
    })

    it('Marca um tipo de Atendimento "Feedback"',function(){

        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')

    })

    it('Marca cada tipo de atendimento',function(){

        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it('Marca ambos checkbox, depois desmarca op último', function(){

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last() //pega só o ultimo do Checkbox
            .uncheck() //Usa para desmarcar
            .should('not.be.checked')

    })

    it('Seleciona arquivo da pasta fixtures', function(){

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona Arquivo simulando Drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'}) // Simula que está arrastando um arquivo para o input
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('Seleciona Arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        
        cy.fixture('example.json').as('FileExp') //  alias para o Arquivo
        cy.get('input[type="file"]')
            .selectFile('@FileExp') // Aqui passa o Alias criado do Arquivo
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    
    })

    



        
})


