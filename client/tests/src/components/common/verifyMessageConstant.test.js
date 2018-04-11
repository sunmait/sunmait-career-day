import { VERIFY_MESSAGE } from 'components/common/email-verification-page/verifyMessageConstant';

describe('email-verification-page', () => {
  test('should valid message', () => {
    const message = 'You was successfully  verified your email address!';

    expect(VERIFY_MESSAGE.VALID).toEqual(message);
  });

  test('should return not valid message', () => {
    const message = 'Link is not valid!';

    expect(VERIFY_MESSAGE.NOT_VALID).toEqual(message);
  });
});