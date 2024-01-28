/// <reference types="Cypress" />

//https://docs.cypress.io/api/commands/intercept

describe('My Mock HTTP Request Test Suite', function(){
    it('My Mock HTTP Request Test case', function(){

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        (req)=>{
            req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"        
            req.continue((res)=>        //Sends request to the server
            {
                //expect(res.statusCode).to.equal(403)    //Not Authorized
            })
        }).as("dummyUrl")
        
        cy.get("button[class='btn btn-primary'").click()

        //Wait until Cypress intercept your response
        //Wait until bookRetrievals promise is resolve
        cy.wait('@dummyUrl')
    })


})