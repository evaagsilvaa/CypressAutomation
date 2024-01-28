/// <reference types="Cypress" />

//https://docs.cypress.io/api/commands/intercept

describe('My Mock HTTP Response Test Suite', function(){
    it('My Mock HTTP Response Test case', function(){

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        },{
            statusCode: 200,
            body: [
                {
                    "book_name": "RestAssured with Java",
                    "isbn": "BSG",
                    "aisle": "2302"
                }   
            ]         
        }).as('bookRetrievals')     //Saves into a variable 

        cy.get("button[class='btn btn-primary'").click()

        //Wait until Cypress intercept your response
        //Wait until bookRetrievals promise is resolve
        cy.wait('@bookRetrievals').then((interception)=>
        {
            //Length of the response array = rows of the table
            cy.get('tr').should('have.length',interception.response.body.length+1)
        })
                                                            
        cy.get('p').should('have.text','Oops only 1 Book available')

        

    })

})