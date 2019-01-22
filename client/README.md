# Sunmait career day client

### Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Installation dependencies:

```sh
npm install
# or
yarn
```

### Configuration

For authorization we using SSO server. To work it in development, you need to start the SSO server and set up environments in the `.env` file:

```sh
REACT_APP_AUTHORITY_URL   # SSO server host name
REACT_APP_CLIENT_ID       # ClientId for SSO server
REACT_APP_SCOPE           # Scopes
```

In development mode, the client runs as a development server. The port on which the development server started is configured in the `.env` file as a variable `PORT`.

Also, in development mode, the client communicates with the server through a proxy. To change the server's URL, change parameter `"proxy"` in the `package.json` file.

### Configuration to run in Docker

#### Development

To start the client in the docker container, you must correctly specify the **port** on which the application is launched (`PORT` variable in the `.env` file) and the **host** for the server (`proxy` parameter in the `package.json` file).

By default, these values ​​should be equal to:

```sh
PORT=3011
# and
"proxy": "sunmait-career-day-dev:3010"
```

These values ​​you can find in the `docker/docker-compose.dev.yml` file.

### Available Scripts

In the client directory, you can run:

#### `npm start`

Runs the app in the development mode.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run e2e-test`

Launches the E2E tests runner.
