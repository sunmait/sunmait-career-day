import { connect, ResolveThunks } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import { deleteNotification } from '../../../redux/modules/app/actions';

const mapStateToProps = (state: IStore) => ({
  notification: state.app.notification,
});


const mapDispatchToProps = {
  deleteNotification,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  ResolveThunks<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);