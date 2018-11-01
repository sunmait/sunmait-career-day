import * as regExpHelper from '../../../../components/helper/regExpHelper';

describe('regexp helper', () => {
  test('match should return array if email is valid', () => {
    const email = 'valid_email.123@gmail.com';

    expect(email.match(regExpHelper.email).length).toBeGreaterThan(0);
  });

  test('match should return null if email is not valid', () => {
    const email = 'this is not valid_email';

    expect(email.match(regExpHelper.email)).toEqual(null);
  });
});
