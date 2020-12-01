const { iterator } = require("core-js/fn/symbol");

// https://docs.cypress.io/api/introduction/api.html
describe("move to reservation page", () => {
  it("Visit reservation page", () => {
    cy.login().then(() => cy.visit("/reservation"));
  });
});

// describe('Create new order', () =>{
//   it*
// })

// describe("Login", () => {
//   it("Visits login page", () => {
//     cy.visit("/auth/login");
//     cy.contains("[data-cy=login]", "Войти");
//   });
//   it("write wrong login or password", () => {
//     //  cy.visit("/auth");
//     cy.get("[data-cy=email]").type("root@root.root");
//     cy.get("[data-cy=password]").type("secretd");
//     cy.contains("Войти")
//       .click()
//       .then(() => {
//         // placing this code inside the .then() ensures
//         // it runs after the cypress commands 'execute'
//         cy.contains(".notification-content", "Ошибка аутентификации");
//       });
//   });
//   it("write correctly login or password", () => {
//     cy.get("input[data-cy=email]").clear();;
//     cy.get("input[data-cy=email]").type("root@root.root");
//     cy.get("input[data-cy=password]").clear();
//     cy.get("input[data-cy=password]").type("secret");
//     cy.wait(100)

//     cy.get("[data-cy=login]").click().then(() => {
//       cy.url().should("include", "/reservation");
//     });
//   });
// });
