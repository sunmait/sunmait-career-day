then('I see {string} header with {string} text', (header, text) => {
  cy.get(header).contains(text);
});

given('I open {string} objectives page', (name) => {
  cy.server()
  cy.route('GET','/api/users/employees').as('getEmployees')
  cy.route('GET','/api/career-days/*').as('getCareerDay')
  cy.route('GET','/api/objectives/*').as('getObjectives')

  cy.visit(`http://localhost:3000/login`)
  .get('button').contains(`Login`)
  .click()
  .wait('@getEmployees')
  .get('a')
  .contains(name)
  .click()
  .wait('@getCareerDay')
  .get('ul')
  .children()
  .first()
  .within(() => {
    cy.get('li')
      .click()
      .wait('@getObjectives')
  });
});

when('I click on {string} expansion panel', (panelText) => {
  cy.get('div')
  .contains(panelText)
  .click();
});