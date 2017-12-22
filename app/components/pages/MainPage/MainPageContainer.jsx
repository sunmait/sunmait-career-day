import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MainPage from './MainPage.jsx';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
