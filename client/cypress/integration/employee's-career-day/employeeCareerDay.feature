Feature: Employee's career days page

  Scenario: I see 'Alexandra Tsvirko' career days
    Given I logged in as 'unit manager'
    And I click on 'Alexandra Tsvirko' link
    When I see 'employees/3' page
    Then I see 'Alexandra Tsvirko' page header
    And I see list

  Scenario: I am redirected to objectives page by click on career day
    Given I logged in as 'unit manager'
    And I click on 'Alexandra Tsvirko' link
    Then I see list
    When I click on top day link
    Then I am redirected to 'employees/3/career-day/8' page
