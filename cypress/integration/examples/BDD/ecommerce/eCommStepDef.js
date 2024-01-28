/// <reference types="Cypress" />
import HomePage from '../../../../support/pageObjects/HomePage'
import ProductPage from '../../../../support/pageObjects/ProductPage'
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


const homePage = new HomePage()
const productPage = new ProductPage()

let name;

Given(/^I open Ecommerce Page$/, () => {        //", () => " equals to ", function () "
    cy.visit(Cypress.env('url') + "/angularpractice/");
});

When(/^I add items to Cart$/, function() {      //ATTENTION: (MOCHA) When using the beforeEach.js file you need to use the method ", function() {" instead of "() => {" on all the files that uses this.data
    homePage.getShopTab().click()
    Cypress.config('defaultCommandTimeout',8000);

    this.data.productName.forEach((element) => {
        cy.selectProduct(element);
    });
    
    productPage.getCheckoutButton().click();
});

When(/^Validate the total prices$/, () => {
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
});

Then(/^Select the country submit and verify Thank you$/, () => {
    cy.contains('Checkout').click();
    cy.get('#country').type('India');
    cy.get('.suggestions > ul > li > a').click();
    cy.get('#checkbox2').click({force: true});
    cy.get('input[type="submit"]').click()

    cy.get('.alert').then(function(element){
        const text = element.text();
        expect(text.includes("Success")).to.be.true     //Chai assertions
    })
});


When(/^I fill the form details$/, (dataTable) => {
    name = dataTable.rawTable[1][0];
    homePage.getEditBox().type(dataTable.rawTable[1][0])    //[1] -> second line (| bobz  | male   |)       //[0] -> first value (bobz)
    homePage.getGender().select(dataTable.rawTable[1][1]);
});

Then(/^Validate te forms behaviour$/, () => {
    //Check if text is present on "Two-way Data Binding example" field
    homePage.getTwoWayDataBinding().should('have.value', name);

    //Check if Name field has a the attribute "minlength" equals to 2
    homePage.getEditBox().should('have.attr','minlength','2')

    //Validate that the option "Entrepreneur (disabled)" on the Employee Status field is disabled
    homePage.getEntrepreneaur().should('be.disabled');
});

Then(/^Select the Shop Page$/, () => {
    homePage.getShopTab().click()
});
