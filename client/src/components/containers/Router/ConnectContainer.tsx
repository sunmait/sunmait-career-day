import { connect, ResolveThunks } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';

const mapStateToProps = (state: IStore) => ({
  user: state.oidc.user,
});

const mapDispatchToProps = {};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  ResolveThunks<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
