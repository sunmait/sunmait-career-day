import { connect } from 'react-redux';
import * as redux from 'redux';
import MainPage from 'components/pages/main-page/MainPage';
import { Dispatch } from 'redux/store';

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(MainPage);
