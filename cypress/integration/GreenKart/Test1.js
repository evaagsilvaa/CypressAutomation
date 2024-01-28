/// <reference types="Cypress" />

describe('My First Test Suite', function(){
    it('My First Test case', function(){
        cy.visit(Cypress.env('url') + "/seleniumPractise/#/");
        cy.get('input[type=search]').type('ca');
        cy.wait(2000);
        //Selenium get hit url in browser, cypress get acts like findElement of selenium
        cy.get('.product').should('have.length',5);
        cy.get('.product:visible').should('have.length',4);

        //Parent child chaining
        cy.get('.products').as('productLocator');
        cy.get('@productLocator').find('.product').should('have.length',4);

        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click();

        cy.get('@productLocator').find('.product').each(($el, index,$list) => {
            const textVeg = $el.find('h4.product-name').text();
            if (textVeg.includes("Cashews")){
                cy.wrap($el).find('button').click();
            }
        })

        //Assert if logo text is correctly displayed
        cy.get('.brand').should('have.text', 'GREENKART')

        //This is to print in logs
        cy.get('.brand').then(function(logoElement) {
            cy.log(logoElement.text());
        })
        

    })

})