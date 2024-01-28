/// <reference types="Cypress" />
const neatCSV = require('neat-csv')
let productName;

describe('JWT Session', function(){
    it('is logged in through local storage', async function(){

        cy.LoginAPI().then(function(){
            cy.visit("https://rahulshettyacademy.com/client",{
                onBeforeLoad: function(window){                     //Does this before loading the page
                    window.localStorage.setItem('token',Cypress.env('token'))
                }
            })
        })
        cy.get(".card-body b").eq(1).then(function(ele){
            productName = ele.text();
        })
        cy.get(".card-body button:last-of-type").eq(1).click();
        cy.get("[routerlink*='cart']").click();
        cy.contains("Checkout").click();
        cy.get("[placeholder*='Country']").type("ind");
        cy.get(".ta-results button").each(($el, index,$list )=>{
            if($el.text() === " India") cy.wrap($el).click()
        })
        cy.get(".action__submit").click();
        cy.wait(2000)
        cy.contains("Click To Download Order Details in CSV").click()

        
        cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_evagsilv.csv").then(async function(text){
            const csv = await neatCSV(text)
            console.log(csv)
            const actualProductCSV = csv[0]["Product Name"]                          //Use csv[0]["Product Name"] if property has spaces or csv[0].ProductName if it doesn't have spaces
            expect(productName).to.equal(actualProductCSV)
        })
    })

})