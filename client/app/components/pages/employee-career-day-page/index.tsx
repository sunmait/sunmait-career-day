import {connect} from 'react-redux';
import {IStore} from 'redux/rootReducer';
import * as redux from 'redux';
import {Dispatch} from 'redux/store';
import * as employeesAction from 'redux/modules/employees/action';
import EmployeeCareerDayPage from './EmployeeCareerDayPage';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  objectives: state.employees.objectives,
  employeeFullName: state.employees.employeeFullName,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators(
    {
      getObjectives: employeesAction.getObjectives,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeCareerDayPage,
);
