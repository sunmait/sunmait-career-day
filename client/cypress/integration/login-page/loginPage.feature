Feature: Login page

  Scenario: There is a app header
    Given I open 'login' page
    And I see logo in app header
    And I see 'Login' page header

  Scenario: There is a Login validation
    Given I open 'login' page
    When I typing in 'email' field: 'stasevich@mail.com'
    And I typing in 'password' field: 'qwerty1'
    And I click on 'Login' button
    Then I see paragraph with 'Login or password is not valid' message

  Scenario: I logged in as employee
    Given I open 'login' page
    When I typing in 'email' field: 'pupkin@mail.com'
    And I typing in 'password' field: 'qwerty'
    And I click on 'Login' button
    Then I should redirect like employee to 'employee' page

  Scenario: I logged in as unit manager
    Given I open 'login' page
    When I typing in 'email' field: 'stasevich@mail.com'
    And I typing in 'password' field: 'qwerty'
    And I click on 'Login' button
    Then I should redirect like unit manager to 'employees' page
