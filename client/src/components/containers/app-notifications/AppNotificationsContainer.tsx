import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IStore } from '../../../redux/rootReducer';
import { deleteNotification } from '../../../redux/modules/app/actions';
import { Dispatch } from '../../../redux/store';

const mapStateToProps = (state: IStore) => ({
  notification: state.app.notification,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteNotification,
    },
    dispatch,
  );

export type ConnectProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
