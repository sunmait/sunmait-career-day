import {connect} from 'react-redux';
import {IRootState} from 'redux/rootReducer';
import * as redux from 'redux';
import {Dispatch} from 'redux/store';
import * as employeesAction from 'redux/modules/employees/employeesAction';
import EmployeeProgressPage from './EmployeeProgressPage';

const mapStateToProps = (state: IRootState) => ({
  careerDays: state.employees.careerDays,
  employeeFullName: state.employees.employeeFullName,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  getCareerDayOfEmployee: employeesAction.getCareerDayOfEmployee,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProgressPage);
