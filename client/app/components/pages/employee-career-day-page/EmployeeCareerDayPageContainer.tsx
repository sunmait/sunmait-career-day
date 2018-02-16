import {connect} from 'react-redux';
import {IRootState} from 'redux/rootReducer';
import * as redux from 'redux';
import {Dispatch} from 'redux/store';
import * as employeesAction from 'redux/modules/employees/employeesAction';
import EmployeeCareerDayPage from './EmployeeCareerDayPage';

const mapStateToProps = (state: IRootState) => ({
  user: state.auth.user,
  employeeFullName: state.employees.employeeFullName,
  objectives: state.employees.objectives,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  getObjectives: employeesAction.getObjectives,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCareerDayPage);
