import backgroundColorHelper from 'components/helper/backgroundColorHelper';

describe('Background color helper', () => {
  test('should set background color by className `default-background`', () => {
    const dispatchSpy = jest.fn();

    const fakeElement = document.createElement('div');
    fakeElement.setAttribute('id', 'main');

    dispatchSpy.mockReturnValue(fakeElement);

    // backgroundColorHelper()(dispatchSpy);
  });
});