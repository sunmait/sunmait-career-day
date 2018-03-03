import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';
import { getEmployeesList } from 'redux/modules/employees/actions';
import EmployeeList from './EmployeeList';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  employees: state.employees.employees,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  getEmployeesList,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
