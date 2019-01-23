Feature: Employee's career days page for manager

  Scenario: I see 'Andrey Shimkov' career days
    Given I logged in as 'UnitManager' with waiting for response
    And I click on 'Andrey Shimkov' link
    When I see 'employees/02d1437c-4c60-4109-9c9a-473bb36e74bb' page
    Then I see 'Andrey Shimkov' page header
    And I see list

  Scenario: I am redirected to objectives page by click on career day
    Given I logged in as 'UnitManager' with waiting for response
    And I click on 'Andrey Shimkov' link
    When I click on career day with '4' id
    Then I am redirected to 'employees/02d1437c-4c60-4109-9c9a-473bb36e74bb/career-day/4' page

  Scenario: I open delete career day popup
    Given I logged in as 'UnitManager' with waiting for response
    And I click on 'Andrey Shimkov' link
    When I click on delete icon of archived career day
    Then I see 'Remove this career day?' modal
    And I click on 'Cancel' button

  Scenario: I delete archived career day
    Given I logged in as 'UnitManager' with waiting for response
    And I click on 'Andrey Shimkov' link
    When I click on delete icon near the archived career day with date '01.01.2018 04:41 PM - 21.11.2018 11:41 AM'
    And I see 'Remove this career day?' modal
    Then I click on 'Delete the day' button waiting for delete response
    And I did not see day with date '01.01.2018 04:41 PM - 21.11.2018 11:41 AM' in the list

  Scenario: I archive career day
    Given I logged in as 'UnitManager' with waiting for response
    And I go to 'Andrey Shimkov' active career day
    Then I click on 'Archive' button
    And I click on 'Archive the day' button

  Scenario: I add new career day
    Given I logged in as 'UnitManager' with waiting for response
    And I click on 'Andrey Shimkov' link
    When I click on 'Add career day' button
    And I see 'Add career day' modal
    Then I click on 'Add' button for adding career day
    And I see new active career day with current start date