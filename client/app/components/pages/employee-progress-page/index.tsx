import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';
import {
  getCareerDayOfEmployee,
  addCareerDay,
  deleteCareerDay,
  getSelectedEmployee,
} from 'redux/modules/employees/actions';
import EmployeeProgressPage from './EmployeeProgressPage';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  careerDays: state.employees.careerDays,
  selectedEmployee: state.employees.selectedEmployee,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  getCareerDayOfEmployee,
  addCareerDay,
  deleteCareerDay,
  getSelectedEmployee,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProgressPage);
