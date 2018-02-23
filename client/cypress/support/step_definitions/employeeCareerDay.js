let openPage = (page) => {
    cy.visit(`http://localhost:3000/${page}/\d`);
};

let checkPage = (page) => {
    cy.url(`http://localhost:3000/${page}/\d`);
}

let checkCareerDayPage = (page) => {
    cy.url(`http://localhost:3000/${page}/\d/career-day/\w`);
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

then('I am redirected to {string} page', (checkCareerDayPage));