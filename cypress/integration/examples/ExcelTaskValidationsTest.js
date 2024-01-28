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
        cy.contains("Click To Download Order Details in Excel").click();

        const filePath = Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_evagsilv.xlsx"
        cy.task('excelToJsonConverter',filePath).then(function(result){
            cy.log(result.data[1].A);       //Go to inspect>console to see the log
            expect(productName).to.equal(result.data[1].B)
        });
        //Another option
        cy.readFile(filePath).then(function(text){
            expect(text).to.include(productName)
        })

        //Browser(Engine) - JS code -> Client Side Enviroment (Front end) - Cypress
            //To resolve this problem: readFileSync is not a function
                //Create a task ('ExcelToJson') on the config.js file
                //Then use the task as: cy.task(ExcelToJson)

        //Node (Engine) - Js code -> Back End applications/Environment
            //Accessing files - fs, database access


    })

})