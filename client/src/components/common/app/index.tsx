import * as React from 'react';
import HeaderBar from '../../containers/header-bar';
import AppNotifications from '../../containers/app-notifications';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

interface IProps {
  children: React.ReactNode;
}

const App = (props: IProps) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <HeaderBar />
      {props.children}
      <AppNotifications />
    </MuiPickersUtilsProvider>
  );
};

export default App;
