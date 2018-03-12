Feature: Login page

  Scenario: There is a app header
    Given I open 'login' page
    And I see logo in app header
    And I see 'Login' page header

  Scenario: There is a 'login' field
    Given I open 'login' page
    When I click on 'Login' button
    Then I am redirected to 'employees' page
