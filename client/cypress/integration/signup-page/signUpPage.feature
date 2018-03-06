Feature: SignUp page

  Scenario: There is a signup page
    Given I open 'signup' page
    And I see 'Sign Up' page header

  Scenario: There is a First Name validation(only letters)
    Given I open 'signup' page
    When I typing in 'firstname' field: 'Sometextwith1'
    And I click on 'Confirm' button
    Then I see paragraph with 'The First Name field can contains only letters' message

  Scenario: There is a Last Name validation(only letters)
    Given I open 'signup' page
    When I typing in 'lastname' field: 'Sometextwith1'
    And I click on 'Confirm' button
    Then I see paragraph with 'The Last Name field can contains only letters' message

  Scenario: There is a First Name validation(not empty)
    Given I open 'signup' page
    When I click on 'Confirm' button
    Then I see paragraph with 'The First Name field can not be empty' message

  Scenario: There is a Last Name validation(not empty)
    Given I open 'signup' page
    When I click on 'Confirm' button
    Then I see paragraph with 'The Last Name field can not be empty' message

  Scenario: There is a Email validation
    Given I open 'signup' page
    When I typing in 'email' field: 'Sometextwith1'
    And I click on 'Confirm' button
    Then I see paragraph with 'Email is not valid' message

  Scenario: There is a Password validation(only letters and numbers)
    Given I open 'signup' page
    When I typing in 'password' field: 'Some textwith_'
    And I click on 'Confirm' button
    Then I see paragraph with 'The Password field can contains only letters and numbers' message

  Scenario: There is a Password validation(password must be longer than 5)
    Given I open 'signup' page
    When I typing in 'password' field: 'weak'
    And I click on 'Confirm' button
    Then I see paragraph with 'The Password minimum length is 6 symbols' message

  Scenario: There is a Password validation(password should not be longer than 18)
    Given I open 'signup' page
    When I typing in 'password' field: 'veryverylongpassword'
    And I click on 'Confirm' button
    Then I see paragraph with 'The Password maximum length is 18 symbols' message

  Scenario: There is a Password confirmation validation(should be same with Password)
    Given I open 'signup' page
    When I typing in 'password' field: 'somepassword'
    And I typing in 'passwordconfirm' field: 'anotherpassword'
    And I click on 'Confirm' button
    Then I see paragraph with 'Password Confirmation should be same with Password' message

