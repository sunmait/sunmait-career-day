import {connect} from 'react-redux';
import {IStore} from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';
import { deleteNotification } from 'redux/modules/app/actions';

import AppNotifications from './AppNotifications';

const mapStateToProps = (state: IStore) => ({
  notification: state.app.notification,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  deleteNotification,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppNotifications);
