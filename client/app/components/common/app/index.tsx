import * as React from 'react';
import HeaderBar from 'components/containers/header-bar';

interface IProps {
  children: React.ReactNode;
}

const App = (props: IProps) => {
  return (
    <div >
      <HeaderBar />
      {props.children}
    </div>
  );
};

export default App;
