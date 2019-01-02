import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IStore } from '../../../../redux/rootReducer';
import {
  getSelectedCareerDay,
  addObjective,
  updateObjectiveManager,
  deleteObjective,
  archiveCareerDay,
  updateInterviewDate,
  getSelectedEmployee,
} from '../../../../redux/modules/employees/actions';
import { Dispatch } from '../../../../redux/store';

const mapStateToProps = (state: IStore) => ({
  user: state.oidc.user,
  selectedCareerDay: state.employees.selectedCareerDay,
  selectedEmployee: state.employees.selectedEmployee,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getSelectedCareerDay,
      addObjective,
      updateObjectiveManager,
      archiveCareerDay,
      deleteObjective,
      updateInterviewDate,
      getSelectedEmployee,
    },
    dispatch,
  );

export type ConnectProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
