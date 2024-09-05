Cypress.Commands.add('fillMandatoryFieldAndSubmit', function(){
    cy.get('#firstName').type('Fabio')
    cy.get('#lastName').type('Soares')
    cy.get('#email').type('fabiojuniorfv1@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
})