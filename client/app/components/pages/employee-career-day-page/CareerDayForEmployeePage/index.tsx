import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';
import CareerDayForEmployeePage from './CareerDayForEmployeePage';
import { getActiveCareerDay, updateObjectiveEmployee } from 'redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  activeCareerDay: state.employees.selectedCareerDay,
});

const mapDispatchToProps = (dispatch: Dispatch) => redux.bindActionCreators({
  getActiveCareerDay,
  updateObjectiveEmployee,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CareerDayForEmployeePage);
