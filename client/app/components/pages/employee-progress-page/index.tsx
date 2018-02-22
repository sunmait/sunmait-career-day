import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';
import {
  getCareerDayOfEmployee,
  getSelectedEmployee,
  addCareerDay,
} from 'redux/modules/employees/action';
import EmployeeProgressPage from './EmployeeProgressPage';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  careerDays: state.employees.careerDays,
  selectedEmployee: state.employees.selectedEmployee,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators(
    {
      getCareerDayOfEmployee,
      getSelectedEmployee,
      addCareerDay,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeProgressPage,
);