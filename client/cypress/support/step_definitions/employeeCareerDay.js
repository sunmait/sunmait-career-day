given('I click on first employee link', () => {
  cy.get('ul')
    .children()
    .first()
    .within(() => {
      cy.get('li').click();
    });
});

when('I click on top day link', () => {
  cy.get('ul')
    .children()
    .first()
    .within(() => {
      cy.get('li').click();
    });
});

when('I click on delete icon of archived career day', () => {
  cy.get('ul')
    .children()
    .within(() => {
      cy.get('button:enabled svg[name = delete-icon]')
        .first()
        .click();
    });
});

when(
  'I click on delete icon near the archived career day with date {string}',
  date => {
    cy.get('ul')
      .children()
      .within(() => {
        cy.get('div')
          .contains(date)
          .parent()
          .parent()
          .within(() => {
            cy.get('svg[name = delete-icon]').click();
          });
      });
  },
);

when('I see {string} modal', pageHeader => {
  cy.get('h2').contains(pageHeader);
});

then('I see {string} modal', pageHeader => {
  cy.get('h2').contains(pageHeader);
});

then('I click on {string} button waiting for delete response', buttonText => {
  cy.server();
  cy.route('DELETE', '/api/career-days/**').as('deleteCD');

  cy.get('button')
    .contains(buttonText)
    .click()
    .wait('@deleteCD');
});

when('I click on career day with {string} id', id => {
  cy.get(`ul div[role="button"][id="${id}"]`)
    .first()
    .click();
});

then('I did not see day with date {string} in the list', date => {
  cy.get('ul')
    .children()
    .get('li')
    .each($li => {
      expect($li).to.not.contain(date);
    });
});

then('I see new active career day with current start date', () => {
  const currentDate = Cypress.moment().format('DD.MM.YYYY hh:mm A');
  cy.get('ul div')
    .first()
    .contains(currentDate);
  cy.get('svg[name = active-icon]');
});

then('I click on {string} button for adding career day', buttonText => {
  cy.server();
  cy.route('POST', '/api/career-days').as('addCareerDay');

  cy.get('button[name = popup-add-button]')
    .contains(buttonText)
    .click()
    .wait('@addCareerDay');
});
