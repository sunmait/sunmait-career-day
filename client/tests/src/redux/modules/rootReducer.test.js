import rootReducer from 'redux/rootReducer.ts';

jest.mock('redux', () => ({
  combineReducers: jest.fn(reducersObj => reducersObj),
}));

describe('rootReducer', () => {
  test('should be an object of correct format', () => {
    expect(rootReducer).toHaveProperty('app');
    expect(rootReducer).toHaveProperty('auth');
    expect(rootReducer).toHaveProperty('employees');
    expect(Object.keys(rootReducer).length).toBe(3);
  });
});