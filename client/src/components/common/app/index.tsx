import * as React from 'react';
import HeaderBar from '../../containers/header-bar';
import AppNotifications from '../../containers/app-notifications';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiDialogActions: {
      root: {
        justifyContent: 'center',
      },
    },
    MuiDialogContent: {
      root: {
        paddingBottom: 8,
      },
    },
  },
});

interface IProps {
  children: React.ReactNode;
}

const App = (props: IProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <HeaderBar />
        {props.children}
        <AppNotifications />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default App;
