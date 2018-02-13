describe('Employee list page', () => {
  it('Should contain header `Employee list`', () => {
    cy.visit('http://localhost:3000/employees')
      .get('h6')
      .contains('NOT EXISTING TEXT');
  });

  it('Should contain employee list', () => {
    cy.visit('http://localhost:3000/employees')
      .get('h6')
      .contains('NOT EXISTING TEXT');
  });

  describe('Employee data', () => {
    it('Should contain employee`s profile image', () => {
      cy.visit('http://localhost:3000/employees')
        .get('h6')
        .contains('NOT EXISTING TEXT');
    });

    it('Should contain employee`s name', () => {
      cy.visit('http://localhost:3000/employees')
        .get('h6')
        .contains('NOT EXISTING TEXT');
    });

    it('Should contain employee`s status icon', () => {
      cy.visit('http://localhost:3000/employees')
        .get('h6')
        .contains('NOT EXISTING TEXT');
    });
  })

  it('Should open list of career days page if user clicked on employee', () => {
    cy.visit('http://localhost:3000/employees')
      .get('h6')
      .contains('NOT EXISTING TEXT');
  });
});
