import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IStore } from '../../../../redux/rootReducer';
import { getActiveCareerDay, updateObjectiveEmployee } from '../../../../redux/modules/employees/actions';
import { Dispatch } from '../../../../redux/store';

const mapStateToProps = (state: IStore) => ({
  user: state.oidc.user,
  activeCareerDay: state.employees.selectedCareerDay,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getActiveCareerDay,
      updateObjectiveEmployee,
    },
    dispatch,
  );

export type ConnectProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
