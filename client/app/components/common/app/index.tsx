import * as React from 'react';
import HeaderBar from 'components/containers/header-bar';
import AppNotifications from 'components/containers/app-notifications';

interface IProps {
  children: React.ReactNode;
}

const App = (props: IProps) => {
  return (
    <div>
      <HeaderBar />
      {props.children}
      <AppNotifications />
    </div>
  );
};

export default App;
