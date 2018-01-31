import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainPageContainer from 'components/pages/MainPage/MainPageContainer';
import store from 'redux/store';

const AppComponent = () => {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/main" component={MainPageContainer} />
          <Route exact path="/about" component={() => <h1>About Page</h1>} />

          <Redirect from="/" exact to="/main" />
        </Switch>
      </Provider>
    </Router>
  );
};

export default AppComponent;
