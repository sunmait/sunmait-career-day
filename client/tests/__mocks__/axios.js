// now 'axios' is mocked in every test like this
const fakeResponse = {
  body: {},
  status: 200,
};

const axiosMock = {
  get: jest.fn().mockReturnValue(Promise.resolve(fakeResponse)),
};

module.exports = axiosMock;
