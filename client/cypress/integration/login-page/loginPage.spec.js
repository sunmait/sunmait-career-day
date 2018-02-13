describe('Login page', () => {
  it('Should contain `login as employee` button', () => {
    cy.visit('http://localhost:3000/login')
      .get('h6')
      .contains('NOT EXISTING TEXT');
  });

  it('Should contain `login as unit manager` button', () => {
    cy.visit('http://localhost:3000/login')
      .get('h6')
      .contains('NOT EXISTING TEXT');
  });

  it('Should open employees list page if user logged as unit manager', () => {
    cy.visit('http://localhost:3000/login')
      .get('h6')
      .contains('NOT EXISTING TEXT');
  });
});
