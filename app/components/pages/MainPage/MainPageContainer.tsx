import * as React from 'react';
import {connect} from 'react-redux';
import * as Redux from 'redux';
import MainPage from 'components/pages/MainPage/MainPage';
import {IRootState} from 'redux/rootReducer';
import {Dispatch} from 'redux/store';

const mapStateToProps = (state: IRootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => Redux.bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
