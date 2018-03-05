then('I see {string} header with {string} text', (header, text) => {
  cy.get(header).contains(text);
});


given('I open objectives page', () => {
  cy.visit(`http://localhost:3000/login`)
  .get('button').contains(`Login`)
  .click()
  .wait(2000)
  .get('a')
  .contains('Vasya Pupkin')
  .click()
  .wait(2000)
  .get('ul')
  .children()
  .first()
  .within(() => {
    cy.get('li').click();
  });
});