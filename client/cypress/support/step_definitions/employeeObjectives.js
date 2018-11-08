then('I see {string} header with {string} text', (header, text) => {
  cy.get(header).contains(text);
});

then('I see information item with {string} text', text => {
  cy.get('li').contains(text);
});

given('I go to {string} active career day', name => {
  cy.server();
  cy.route('GET', '/api/career-days/*').as('getCareerDay');
  cy.route('GET', '/api/objectives/*').as('getObjectives');

  cy.get('a')
    .contains(name)
    .click()
    .wait('@getCareerDay')
    .get('ul')
    .children()
    .first()
    .within(() => {
      cy.get('li')
        .click()
        .wait('@getObjectives');
    });
});

given('I open {string} objectives page', name => {
  cy.server();
  cy.route('GET', '/api/users/employees').as('getEmployees');
  cy.route('GET', '/api/career-days/*').as('getCareerDay');
  cy.route('GET', '/api/objectives/*').as('getObjectives');

  cy.visit(`http://localhost:3001/login`)
    .get('button')
    .contains(`Login`)
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
        .wait('@getObjectives');
    });
});

when('I click on {string} expansion panel', panelText => {
  cy.get('div')
    .contains(panelText)
    .click();
});
