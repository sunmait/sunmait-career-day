import {connect} from 'react-redux';
import {IStore} from 'redux/rootReducer';
import HeaderBar from './HeaderBar';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(HeaderBar);
