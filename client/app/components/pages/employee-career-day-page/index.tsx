import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import * as redux from 'redux';
import { Dispatch } from 'redux/store';

import { getSelectedCareerDay } from 'redux/modules/employees/action';
import EmployeeCareerDayPage from './EmployeeCareerDayPage';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  selectedCareerDay: state.employees.selectedCareerDay,
  selectedEmployee: state.employees.selectedEmployee,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators(
    {
      getSelectedCareerDay,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeCareerDayPage,
);
