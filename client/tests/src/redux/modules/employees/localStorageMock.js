export default class LocalStorageMock {
  constructor() {
    this.store = {
      AccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
      RefreshToken: '9aece55173374449d113839cd8cdf5c43',
      User: {
        FirstName: "Kirill",
        LastName: "Stasevich",
        PhotoUrl: "https://vk.com/images/camera_200.png",
        Roles: "manager",
        id: 4,
      },

    };
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }
}

global.localStorage = new LocalStorageMock;
