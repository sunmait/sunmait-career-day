let openPage = (page) => {
  cy.visit(`http://localhost:3000/${page}/\d`);
};

let checkPage = (page) => {
  cy.url(`http://localhost:3000/${page}`);
}


given('I open {string} page', openPage);

given('I see {string} page', (checkPage));

given('I see {string} page header', (pageHeader) => {
  cy.get('h1').contains(pageHeader);
})

when('I click on top day link', () => {
  cy.get('ul')
    .children()
    .first()
    .within(() => {
      cy.get('li').click();
    })
});

then('I should redirect to active career day {string}',  (page) => {
  cy.get('ul')
    .children()
    .first()
    .within(() => {
      cy.get('li').then( event => {
        const id = event[0].children[0].id;
        cy.get('li')
          .click()
          .url().should('eq', `http://localhost:3000/${page}${id}`);
      })
    })
});