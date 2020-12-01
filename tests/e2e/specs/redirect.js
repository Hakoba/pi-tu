describe("move to users page", () => {
  it("Visit user page", () => {
    cy.login({ email: "test_adm@tvid.tech", password: "test" }).then(() =>
      cy.visit("#/userControlPanel")
    );
  });
});

describe("move to others page", () => {
  it("move to agency", () => {
    cy.login({ email: "test_adm@tvid.tech", password: "test" }).then(() =>
      cy.visit("#/agencyControlPanel")
    );

    cy.contains("Управление агентствами");
  });
  it("move to clients", () => {
    cy.login({ email: "test_adm@tvid.tech", password: "test" }).then(() =>
      cy.visit("#/clientControlPanel")
    );
    cy.contains("Управление клиентами");
  });
  it("move to invalid route", () => {
    cy.login({ email: "test_adm@tvid.tech", password: "test" }).then(() =>
      cy.visit("#/clientControlPanelyohohoh")
    );
    cy.contains("Ошибка 404: Страница не найдена");
  });
});

describe("check redirect with user access", () => {
  it("Visit projects page", () => {
    cy.login({ email: "test_u@tvid.tech", password: "test" }).then(() => {
      cy.visit("#/projects");
      cy.contains("Проекты");
    });
  });
  it("Visit user page (expected redirect to userpage)", () => {
    cy.login({ email: "test_u@tvid.tech", password: "test" }).then(() => {
      cy.visit("#/userControlPanel");
      cy.contains("Проекты");
    });
  });
});
