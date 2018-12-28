import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StylesProps } from './StylesContainer';

interface IProps extends StylesProps {}

const Loader = (props: IProps) => {
  return (
    <div className={props.classes.root}>
      <div className={props.classes.progressWrapper}>
        <CircularProgress size={100} thickness={1} color="primary" />
      </div>
    </div>
  );
};

export default Loader;
