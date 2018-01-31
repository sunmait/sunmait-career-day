import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import MainPage from 'components/pages/MainPage/MainPage';
import IStore from 'types/index';

const mapStateToProps = (state: IStore) => ({
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<IStore>) => Redux.bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
