Feature: Employee's objectives page

  Background: I logged in as employee
    Given I open 'login' page
    When I typing in 'email' field: 'pupkin@mail.com'
    And I typing in 'password' field: 'qwerty'
    And I click on 'Login' button
    Then I am redirected to 'employee' page

  Scenario: I see 'Vasya Pupkin' objectives page
    Then I see "Vasya Pupkin's career day" page header

  Scenario: I see datetime information
    Then I see 'h3' header with 'Created at' text
    And I see 'h3' header with 'Updated at' text
    And I see 'h3' header with 'Interview Date' text

  Scenario: I see objective info
    When I click on 'objective 1' expansion panel
    Then I see paragraph with 'Created at:' message
    And I see paragraph with 'Updated at:' message
    And I see paragraph with 'Progress:' message

