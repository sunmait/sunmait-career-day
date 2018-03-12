Feature: Employee's career days page

  Scenario: I see 'Alexandra Tsvirko' career days
    Given I logged in as 'unit manager'
    And I click on 'Alexandra Tsvirko' link
    When I see 'employees/3' page
    Then I see "Alexandra Tsvirko's progress days" page header
    And I see paragraph with "This employee doesn't have career days." message
