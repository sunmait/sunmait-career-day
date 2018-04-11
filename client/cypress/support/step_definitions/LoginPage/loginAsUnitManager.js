const _ = Cypress._;

const options = {
  method: 'POST',
  url: 'http://localhost:3000/api/auth',
  form: true,
  body: {
    Email: 'stasevich@mail.com',
    Password: 'qwerty'
  }
};

const unitManager = {
  FirstName: "Kirill",
  LastName: "Stasevich",
  PhotoUrl: "https://vk.com/images/camera_200.png",
  Role: "manager",
  id: 4,
};

then('I should redirect like unit manager to {string} page', url => {
  Cypress.Commands.add('loginBySingleSignOn', (overrides = {}) => {
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

      expect(res.body.Data).to.deep.eq(unitManager);
    });
});


when('I click like UM on {string} link', (linkText) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:3000/api/users/selected-employee/3',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiUm9sZSI6Im1hbmFnZXIiLCJQaG90b1VybCI6Imh0dHBzOi8vdmsuY29tL2ltYWdlcy9jYW1lcmFfMjAwLnBuZyIsIkxhc3ROYW1lIjoiU3Rhc2V2aWNoIiwiRmlyc3ROYW1lIjoiS2lyaWxsIiwiRW1haWwiOiJzdGFzZXZpY2hAbWFpbC5jb20iLCJpYXQiOjE1MjgyMDU1NjUsImV4cCI6MTUyODIwOTE2NX0.WO6sXAPtmfsvL6BMGcVqTQ0CctDsuODLkgoJ-sty9sk',
      ContentType: 'application/x-www-form-urlencoded',
    },
  };

  cy.request(options).as('selectedEmployee');

  // cy.server()
  //   .route('http://localhost:3000/api/users/selected-employee/3').as('selectedEmployee')

  cy.get('a')
    .contains(linkText)
    .click()
});