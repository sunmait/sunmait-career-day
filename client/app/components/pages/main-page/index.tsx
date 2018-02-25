import { connect } from 'react-redux';
import * as Redux from 'redux';
import MainPage from 'components/pages/main-page/MainPage';
import { Dispatch } from 'redux/store';

const mapDispatchToProps = (dispatch: Dispatch) =>
  Redux.bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(MainPage);
