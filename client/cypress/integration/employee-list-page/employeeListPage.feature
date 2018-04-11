Feature: Employee list page

  Scenario: I logged in as unit manager
    Given I open 'login' page
    When I typing in 'email' field: 'stasevich@mail.com'
    And I typing in 'password' field: 'qwerty'
    And I click on 'Login' button
    Then I should redirect like unit manager to 'employees' page

  Scenario: I see user profile section in header
    When I see 'employees' page
    Then I see 'Kirill Stasevich' username in app header

  Scenario: I see list of Employee page
    When I see 'employees' page
    Then I see 'List Of Employees' page header
    Then I see links

  Scenario: I am redirected to progress page by click on selected employee
    When I click like UM on 'Alexandra Tsvirko' link
#    Then I am redirected to 'employee/3' page

#    Then I should redirect to selected employee 'employee/3' page

#    Then I am redirected to 'employees/3' page
#    Then I see 'Alexandra Tsvirko's progress days' page header
