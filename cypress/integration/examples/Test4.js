/// <reference types="Cypress" />

describe('Alert and Confirm Popup Test Suite', function(){
    it('should handle Alert and Confirm Popup', function(){
        cy.visit(Cypress.env('url') + "/AutomationPractice/");
        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()

        //window:alert
        cy.on('window:alert',(str) => {
            //Mocha
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        //window:confirm
        cy.on('window:confirm',(str) => {
            //Mocha
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

    })

})