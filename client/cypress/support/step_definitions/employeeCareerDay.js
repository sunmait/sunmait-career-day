let openPage = (page) => {
  cy.visit(`/${page}/\d`);
};

let checkPage = (page) => {
  cy.url(`/${page}`);
};


given('I open {string} page', openPage);

given('I see {string} page', (
  checkPage));

given('I see {string} page header', (pageHeader) => {
  cy.get('h1').contains(pageHeader);
});

given('I logged in as {string} with waiting for response', () => {
  cy.server()
  cy.route('GET', '/api/users/employees').as('getEmployees');
  cy.visit(`/login`)
    .get('button').contains(`Login`)
    .click()
    .wait('@getEmployees')
});

given('I click on first employee link', () => {
  cy.get('ul')
    .children()
    .first()
    .within(() => {
      cy.get('li').click();
    })
});

when('I click on top day link', () => {
  cy.get('ul')
    .children()
    .first()
    .within(() => {
      cy.get('li').click();
    })
});

when('I click on delete icon of archived career day', () => {
  cy.get('ul')
    .children()
    .within(() => {
      cy.get('div[name = archived]')
        .parent()
        .within(() => {
          cy.get('svg[name = delete-icon]')
            .first()
            .click()
        })

    })
});

when('I click on delete icon near the archived career day with date {string}', (date) => {
  cy.get('ul')
    .children()
    .within(() => {
      cy.get('h3')
        .contains(date)
        .parent()
        .parent()
        .parent()
        .within(() => {
          cy.get('svg[name = delete-icon]')
            .click()
        })
    })
});

when('I see modal dialog for deleting the career day', () => {
  cy.get('h2')
    .contains('Remove this career day?')
});

when('I see {string} header', (pageHeader) => {
  cy.get('h2').contains(pageHeader);
});

then('I click on {string} button waiting for response', (buttonText) => {
  cy.server()
  cy.route('DELETE', '/api/career-days/*').as('deleteCD')

  cy.get('button')
    .contains(buttonText)
    .click()
    .wait('@deleteCD')
});

then('I see modal dialog for deleting the career day', () => {
  cy.get('h2')
    .contains('Remove this career day?')
});

then('I should redirect to active career day {string}', (page) => {
  cy.get('ul')
    .children()
    .first()
    .within(() => {
      cy.get('li').then(event => {
        const id = event[0].children[0].id;
        cy.get('li')
          .click()
          .url().should('eq', `http://localhost:3000/${page}${id}`);
      })
    })
});

then('I did not see day with date {string} in the list', (date) => {
  cy.get('ul')
    .children()
    .get('li')
    .each(($li) => {
      expect($li).to.not.contain(date)
    })
});

then('I see new active career day with current start date', () => {
  const currentDate = Cypress.moment().format('DD.MM.YYYY hh:mm A');
  cy.get('h3')
    .contains(currentDate);
  cy.get('svg[name = active-icon]')
});

then('I click on {string} button for adding career day', (buttonText) => {
  cy.server();
  cy.route('POST', '/api/career-days').as('addCareerDay')

  cy.get('button[name = popup-add-button]')
    .contains(buttonText)
    .click()
    .wait('@addCareerDay');
});
