import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c0e4dc6... added removing objective
import {
  getSelectedCareerDay,
  addObjective,
  updateObjective,
  deleteObjective,
  archiveCareerDay,
} from 'redux/modules/employees/actions';
<<<<<<< HEAD
=======
import { getSelectedCareerDay, addObjective, updateObjective, archiveCareerDay } from 'redux/modules/employees/actions';
>>>>>>> cb6ec73... added archive action for career days
=======
>>>>>>> c0e4dc6... added removing objective
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
<<<<<<< HEAD
  deleteObjective,
=======
>>>>>>> cb6ec73... added archive action for career days
=======
  deleteObjective,
>>>>>>> c0e4dc6... added removing objective
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeCareerDayPage,
);
