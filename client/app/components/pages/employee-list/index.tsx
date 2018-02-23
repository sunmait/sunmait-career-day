import {connect} from 'react-redux';
import {IStore} from 'redux/rootReducer';
import * as redux from 'redux';
import {Dispatch} from 'redux/store';
import * as employeesAction from 'redux/modules/employees/action';
import EmployeeList from './EmployeeList';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  employees: state.employees.employees,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators(
    {
      getEmployeesList: employeesAction.getEmployeesList,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
