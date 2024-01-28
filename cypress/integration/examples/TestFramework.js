/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage'
import ProductPage from '../../support/pageObjects/ProductPage'

describe('My First Test Suite', function(){
    before(() => {
        // root-level hook
        // runs once before all tests
        cy.fixture('example').then(function(data) {
            this.data = data
        })
    })


    it('My First Test case', function(){
        const homePage = new HomePage();
        const productPage = new ProductPage();

        cy.visit(Cypress.env('url') + "/angularpractice/");

        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender);

        //Check if text is present on "Two-way Data Binding example" field
        homePage.getTwoWayDataBinding().should('have.value', this.data.name);

        //Check if Name field has a the attribute "minlength" equals to 2
        homePage.getEditBox().should('have.attr','minlength','2')

        //Validate that the option "Entrepreneur (disabled)" on the Employee Status field is disabled
        homePage.getEntrepreneaur().should('be.disabled');


        //cy.pause()        //For debugging

        homePage.getShopTab().click()

        Cypress.config('defaultCommandTimeout',8000);

        this.data.productName.forEach((element) => {
            cy.selectProduct(element);
        });
        
        productPage.getCheckoutButton().click();

        //Get Sum of the prices
        var sum = 0;
        cy.get('tr td:nth-child(4) strong').each(($el, index,$list) => {
            const actualText = $el.text();
            var res = actualText.split(" ");
            res = res[1].trim();
            sum = sum + Number(res);
            
        }).then(function(){
            cy.log(sum);
        })
        cy.get('h3 strong').then(function(element){
            const amount = element.text()
            var res = amount.split(" ")
            var total = res[1].trim();
            expect(Number(total)).to.equal(sum);
        })

        cy.contains('Checkout').click();
        cy.get('#country').type('India');
        cy.get('.suggestions > ul > li > a').click();
        cy.get('#checkbox2').click({force: true});
        cy.get('input[type="submit"]').click()
        
        cy.get('.alert').then(function(element){
            const text = element.text();
            expect(text.includes("Success")).to.be.true     //Chai assertions
        })
    })



})