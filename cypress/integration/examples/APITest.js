/// <reference types="Cypress" />

//https://docs.cypress.io/api/commands/request

describe('My API Test Suite', function(){
    it('My API Test case', function(){

        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php',
        {
            "name":"Learn Appium Automation with Java",
            "isbn": "bcd",
            "aisle": "227",
            "author": "John Foe"
        }).then(function(response){
            expect(response.body).to.have.property("Msg","successfully added")
            expect(response.status).to.eq(200)
        })


    })


})