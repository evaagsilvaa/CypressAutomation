/// <reference types="Cypress" />

describe('Mouse Hover Test Suite', function(){
    it('should handle mouse hover element', function(){
        cy.visit(Cypress.env('url') + "/AutomationPractice/");

        //cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click({force :true})
        cy.url().should('include','top')


    })

})