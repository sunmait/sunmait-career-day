Feature: Manager's objectives page

  Scenario: I logged in as unit manager
    Given I open 'login' page
    When I typing in 'email' field: 'stasevich@mail.com'
    And I typing in 'password' field: 'qwerty'
    And I click on 'Login' button
    Then I am redirected to 'employees' page

  Scenario: I see user profile section in header
    When I see 'employees' page
    Then I see 'Kirill Stasevich' username in app header

  Scenario: I see 'Employee list' page header
    When I see 'employees' page
    Then I see 'List Of Employees' page header

  Scenario: I am redirected to progress page by click on employee
    When I click on 'Vasya Pupkin' link
    When I see 'employees/1' page
    Then I see 'Vasya Pupkin' page header
    And I see list


#  Scenario: I see 'Vasya Pupkin's' progress days
#    Then I see "Vasya Pupkin's progress days" page header
#
#  Scenario: I see datetime information
#    When I open 'Vasya Pupkin' objectives page
#    Then I see 'h3' header with 'Created at' text
#    And I see 'h3' header with 'Updated at' text
#    And I see 'h3' header with 'Interview Date' text
#
#  Scenario: I change interview datetime
#    Given I open 'Vasya Pupkin' objectives page
#    When I click on 'Change interview date' button
#    Then I see 'h2' header with 'Change interview date' text
#    And I see 'Update' button
#
#  Scenario: I archive career day
#    Given I open 'Vasya Pupkin' objectives page
#    When I click on 'Archive' button
#    Then I see 'h2' header with 'Archive this career day' text
#    And I see 'Archive the day' button
#
#  Scenario: I add objective
#    Given I open 'Vasya Pupkin' objectives page
#    When I click on 'Add objective' button
#    Then I see 'h2' header with 'Add objective' text
#    And I see 'Title' form input label
#    And I see 'Description' form input label
#    And I see 'Add' button
#
#  Scenario: I see objective info
#    Given I open 'Vasya Pupkin' objectives page
#    When I click on 'objective 1' expansion panel
#    Then I see paragraph with 'Created at:' message
#    And I see paragraph with 'Updated at:' message
#    And I see paragraph with 'Progress:' message