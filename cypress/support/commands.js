// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('selectProduct', (productName) => { 
    cy.get('.card-title').each(($el, index,$list) => {
    const text = $el.text();
    if (text.includes(productName)){
        cy.get('button.btn.btn-info').eq(index).click();
    }
}) })

Cypress.Commands.add('LoginAPI', () => { 
    cy.request("POST","https://rahulshettyacademy.com/api/ecom/auth/login",
    {"userEmail":"evagsilv@gmail.com","userPassword":"15396065+Eva"}).then(function(response){
        expect(response.status).to.eq(200);
        Cypress.env('token',response.body.token);       //Cypress.env() allows to use the variable 'token' anywhere from the project
    })
})