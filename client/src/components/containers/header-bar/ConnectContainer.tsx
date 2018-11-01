import { connect } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import { logout } from '../../../redux/modules/auth/actions';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  logout,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
