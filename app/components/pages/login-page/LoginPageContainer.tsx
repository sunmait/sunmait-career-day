import * as React from 'react';
import {connect} from 'react-redux';
import * as redux from 'redux';
import LoginPage from './LoginPage';
import {IRootState} from 'redux/rootReducer';
import {Dispatch} from 'redux/store';

const mapStateToProps = (state: IRootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
