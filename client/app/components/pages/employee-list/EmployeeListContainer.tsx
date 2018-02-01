import {connect} from 'react-redux';
import {IRootState} from 'redux/rootReducer';
import * as redux from 'redux';
import {Dispatch} from 'redux/store';
import * as employeesAction from 'redux/modules/employees/employeesAction';
import EmployeeList from './EmployeeList';

const mapStateToProps = (state: IRootState) => ({
  user: state.auth.user,
<<<<<<< HEAD
  employeesProfile: state.employees.profile,
=======
  employees: state.employees.profile,
>>>>>>> d161a6f... manager page was added in route+additions to tslint config
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  getEmployeesList: employeesAction.getEmployeesList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
