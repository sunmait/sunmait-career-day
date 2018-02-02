import * as React from 'react';
import {connect} from 'react-redux';
import * as redux from 'redux';
import LoginPage from './LoginPage';
import * as authActions from 'redux/modules/auth/authActions';
import {IRootState} from 'redux/rootReducer';
import {Dispatch} from 'redux/store';

const mapStateToProps = (state: IRootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  loginAsEmployee: authActions.loginAsEmployee,
  loginAsUnitManager: authActions.loginAsUnitManager,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
