Feature: Employee's career days page

  Scenario: I see 'Alexandra Tsvirko' career day
    Given I logged in as 'unit manager'
    And I click on 'Alexandra Tsvirko' link
    And I see 'employees/4' page
    And I see 'Alexandra Tsvirko' page header

  Scenario: I see list of employees career days
    Given I logged in as 'unit manager'
    And I click on 'Alexandra Tsvirko' link
    When I see 'employees/4' page
    Then I see list

  Scenario: I see list of employees career days
    Given I logged in as 'unit manager'
    And I click on 'Alexandra Tsvirko' link
    When I click on some day link
    Then I am redirected to 'employees/4/career-day/some-day-url' page
