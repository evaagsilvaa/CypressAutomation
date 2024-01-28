/// <reference types="Cypress" />

describe('My Third Test Suite', function(){
    it('My Third Test case', function(){
        cy.visit(Cypress.env('url') + "/AutomationPractice/");

        //Checkboxes
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1');
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
        cy.get('input[type="checkbox"]').check(['option2','option3']);

        //Static Dropdowns
        cy.get('select').select('option2').should('have.value','option2');

        //Dynamic Dropdowns
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item-wrapper').each(($el, index,$list) => {
            if($el.text() === 'India') cy.wrap($el).click();
        })
        cy.get('#autocomplete').should('have.value','India')

        //Hide/Show
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //Radio buttons
        cy.get('[value="radio1"]').check().should('be.checked')
    })

})