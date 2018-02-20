import backgroundColorHelper from 'components/helper/backgroundColorHelper';

describe('Background color helper', () => {
  test('should set background color by className `default-background`', () => {
    const body = document.querySelector('body');

    backgroundColorHelper();

    expect(body.className).toEqual('default-background');
  });
});
