/// <reference types="Cypress" />

context('Window', ()=> {

    it('Database Interaction', () => {
        cy.sqlServer("Select * from Persons").then(function(result){
            console.log(result[0][1])       //First Row and second collumn
        })
    })
})