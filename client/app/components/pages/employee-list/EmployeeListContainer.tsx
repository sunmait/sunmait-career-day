import * as React from 'react';
import {connect} from 'react-redux';
import EmployeeList from './EmployeeList';
import {IRootState} from 'redux/rootReducer';

const mapStateToProps = (state: IRootState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(EmployeeList);
