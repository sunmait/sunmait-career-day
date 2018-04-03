Feature: Employee's career days page for manager

  Scenario: I see 'Vasya Pupkin' career days
    Given I logged in as 'unit manager' with waiting for response
    And I click on 'Vasya Pupkin' link
    When I see 'employees/1' page
    Then I see 'Vasya Pupkin' page header
    And I see list

  Scenario: I am redirected to objectives page by click on career day
    Given I logged in as 'unit manager' with waiting for response
    And I click on 'Vasya Pupkin' link
    Then I should redirect to active career day 'employees/1/career-day/'


  Scenario: I open delete career day popup
    Given I logged in as 'unit manager' with waiting for response
    And I click on 'Vasya Pupkin' link
    When I click on delete icon of archived career day
    Then I see modal dialog for deleting the career day
    And I click on 'Cancel' button

  Scenario: I delete archived career day
    Given I logged in as 'unit manager' with waiting for response
    And I click on 'Vasya Pupkin' link
    When I click on delete icon near the archived career day with date '01.01.2018 04:41 PM - 21.11.2018 11:41 AM'
    And I see modal dialog for deleting the career day
    Then I click on 'Delete the day' button waiting for response
    And I did not see day with date '01.01.2018 04:41 PM - 21.11.2018 11:41 AM' in the list

  Scenario: I add new career day
    Given I logged in as 'unit manager' with waiting for response
    And I click on 'Petya Pupkin' link
    When I click on 'Add career day' button
    And I see 'Add career day' header
    Then I click on 'Add' button for adding career day
    And I see new active career day with current start date