Feature: Employee list page

  Scenario: I see user profile section in header
    Given I logged in as 'UnitManager'
    When I see 'employees' page
    Then I see 'Pavel Dziashchenia' username in app header

  Scenario: I see 'Employee list' page header
    Given I logged in as 'UnitManager'
    When I see 'employees' page
    Then I see 'List Of Employees' page header

  Scenario: I see employee list
    Given I logged in as 'UnitManager'
    When I see 'employees' page
    Then I see list

  Scenario: I see employee data in list of employees

  Scenario: I am redirected to career day page by click on employee
    Given I logged in as 'UnitManager'
    And I see 'employees' page
    Then I see list
    When I click on 'Andrey Kostiv' link
    Then I am redirected to 'employees/c64e0924-d531-421d-a415-f717ac91fbfa' page