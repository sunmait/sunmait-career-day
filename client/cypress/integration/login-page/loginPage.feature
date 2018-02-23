Feature: Login page

  Scenario: There is a app header
    Given I open 'login' page
    And I see logo in app header

  Scenario: There is a 'login as employee' button
    Given I open 'login' page
    And I see 'Login as employee' button

  Scenario: There is a 'login as unit manager' button
    Given I open 'login' page
    And I see 'Login as unit manager' button

  Scenario: Should open employee list page if I login as unit manager
    Given I open 'login' page
    When I click on 'Login as unit manager' button
    Then I am redirected to 'employees' page