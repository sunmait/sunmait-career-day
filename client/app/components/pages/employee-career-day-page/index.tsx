import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';
import {
  getSelectedCareerDay,
  addObjective,
  updateObjective,
  deleteObjective,
  archiveCareerDay,
} from 'redux/modules/employees/actions';
import EmployeeCareerDayPage from './EmployeeCareerDayPage';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  selectedCareerDay: state.employees.selectedCareerDay,
  selectedEmployee: state.employees.selectedEmployee,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  getSelectedCareerDay,
  addObjective,
  updateObjective,
  archiveCareerDay,
  deleteObjective,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeCareerDayPage,
);
