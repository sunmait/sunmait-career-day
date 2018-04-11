function storageMock() {
  let storage = {
    AccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
    RefreshToken: '9aece55173374449d113839cd8cdf5c43',
    User: {
      FirstName: "Kirill",
      LastName: "Stasevich",
      PhotoUrl: "https://vk.com/images/camera_200.png",
      Roles: "manager",
      id: 4,
    }
  };

  return {
    setItem: jest.fn((key, value) => storage[key] = value || ''),
    getItem: jest.fn(key => storage[key] || null),
    removeItem: jest.fn(key => delete storage[key]),
    clear: jest.fn(() => storage = {}),
    length: jest.fn(()=>  Object.keys(storage).length)
  };
}

module.exports = window.localStorage = storageMock();
