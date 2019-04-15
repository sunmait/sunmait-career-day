import { connect, ResolveThunks } from 'react-redux';
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

const mapStateToProps = (state: IStore) => ({
  user: state.oidc.user,
  selectedCareerDay: state.employees.selectedCareerDay,
  selectedEmployee: state.employees.selectedEmployee,
  loadCarreerDayForEmployee: state.employees.loadCarreerDayForEmployee,
  loadSelectedCareerDay: state.employees.loadSelectedCareerDay,
});

const mapDispatchToProps = {
  getSelectedCareerDay,
  addObjective,
  updateObjectiveManager,
  archiveCareerDay,
  deleteObjective,
  updateInterviewDate,
  getSelectedEmployee,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  ResolveThunks<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
