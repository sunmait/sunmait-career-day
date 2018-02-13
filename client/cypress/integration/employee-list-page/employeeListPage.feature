Feature: Employee list page

  Scenario: I see 'Employee list' page header
    Given I logged in as 'unit manager'
    When I see 'employees' page
    Then I see 'List Of Employees' page header

  Scenario: I see employee list
    Given I logged in as 'unit manager'
    When I see 'employees' page
    Then I see list

  Scenario: I see employee data in list of employees

  Scenario: I am redirected to career day page by click on employee
    Given I logged in as 'unit manager'
    And I see 'employees' page
    When I click on 'Alexandra Tsvirko' link
    Then I am redirected to 'employees/4' page