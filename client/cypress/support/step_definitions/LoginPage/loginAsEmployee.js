const _ = Cypress._;

const options = {
  method: 'POST',
  url: 'http://localhost:3000/api/auth',
  form: true,
  body: {
    Email: "pupkin@mail.com",
    Password: 'qwerty'
  }
};

const employee = {
  FirstName: "Vasya",
  LastName: "Pupkin",
  PhotoUrl: "https://vk.com/images/camera_200.png",
  Role: "employee",
  id: 1,
};

then('I should redirect like employee to {string} page', url => {
  Cypress.Commands.add('loginBySingleSignOn', ( overrides = {}) => {
    Cypress.log({
      name: 'loginBySingleSignOn'
    });

    _.extend(options, overrides);
    cy.request(options);
  });

  cy.loginBySingleSignOn({followRedirect: false})
    .then(res => {
      cy.server();

      cy.visit(`/${url}`, {
        onBeforeLoad: win => {
          win.localStorage.setItem('AccessToken', res.body.AccessToken);
          win.localStorage.setItem('RefreshToken', res.body.RefreshToken);
          win.localStorage.setItem('User', JSON.stringify(res.body.Data));
        }
      });

      expect(res.status).to.eq(200);

      expect(res.body.Data).to.deep.eq(employee);
    });
});
