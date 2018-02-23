import {connect} from 'react-redux';
import {IStore} from 'redux/rootReducer';
import * as redux from 'redux';
import {Dispatch} from 'redux/store';
import * as employeesAction from 'redux/modules/employees/action';
import EmployeeProgressPage from './EmployeeProgressPage';

const mapStateToProps = (state: IStore) => ({
  careerDays: state.employees.careerDays,
  employeeFullName: state.employees.employeeFullName,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators(
    {
      getCareerDayOfEmployee: employeesAction.getCareerDayOfEmployee,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeProgressPage,
);
