import { connect } from 'react-redux';
import { IStore } from '../../../../redux/rootReducer';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
