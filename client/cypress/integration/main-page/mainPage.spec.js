describe('Main page', () => {
  it('Should open auth page and find `Login` text there', () => {
    cy.visit('http://localhost:3000/login')
      .get('h1')
      .contains('Login');
  });
});
