Feature: Employee's career days page

  Scenario: I see 'Vasya Pupkin' career days
    Given I logged in as 'unit manager'
    And I click on 'Vasya Pupkin' link
    When I see 'employees/1' page
    Then I see 'Vasya Pupkin' page header
    And I see list

  Scenario: I am redirected to objectives page by click on career day
    Given I logged in as 'unit manager'
    And I click on 'Vasya Pupkin' link
    Then I should redirect to active career day 'employees/1/career-day/'
