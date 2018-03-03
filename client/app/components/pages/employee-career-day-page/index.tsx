import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';
<<<<<<< HEAD
import {
  getSelectedCareerDay,
  addObjective,
  updateObjective,
  deleteObjective,
  archiveCareerDay,
} from 'redux/modules/employees/actions';
=======
import { getSelectedCareerDay, addObjective, updateObjective, archiveCareerDay } from 'redux/modules/employees/actions';
>>>>>>> cb6ec73... added archive action for career days
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
<<<<<<< HEAD
  deleteObjective,
=======
>>>>>>> cb6ec73... added archive action for career days
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeCareerDayPage,
);
