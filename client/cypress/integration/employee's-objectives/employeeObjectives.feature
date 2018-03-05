Feature: Employee's objectives page

  Scenario: I see 'Vasya Pupkin' objectives page
    Given I open objectives page
    Then I see 'career day' page header

  Scenario: I see datetime information
    Given I open objectives page
    Then I see 'h3' header with 'Created at' text
    And I see 'h3' header with 'Updated at' text
    And I see 'h3' header with 'Interview Date' text

  Scenario: I change interview datetime
    Given I open objectives page
    When I click on 'Change interview date' button
    Then I see 'h2' header with 'Change interview date' text
    And I see 'Update' button

  Scenario: I archive career day
    Given I open objectives page
    When I click on 'Archive' button
    Then I see 'h2' header with 'Archive this career day' text
    And I see 'Yes' button

  Scenario: I archive career day
    Given I open objectives page
    When I click on 'Add objective' button
    Then I see 'h2' header with 'Add objective' text
    And I see 'Title' form input label
    And I see 'Description' form input label
    And I see 'Add' button
