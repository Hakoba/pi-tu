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
Cypress.Commands.add(
  "login",
  (data = { email: "root@root.root", password: "secret" }) => {
    let { email, password } = data;
    cy.request({
      method: "POST",
      url: "http://94.79.55.53:8080/api/v1/login",
      body: {
        email,
        password
      }
    }).then(resp => {
      console.log(resp);
      window.localStorage.setItem("userToken", resp.body.data.access_token);
    });
  }
);

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
