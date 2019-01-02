import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IStore } from '../../../redux/rootReducer';
import {
  getCareerDayOfEmployee,
  addCareerDay,
  deleteCareerDay,
  getSelectedEmployee,
} from '../../../redux/modules/employees/actions';
import { Dispatch } from '../../../redux/store';

const mapStateToProps = (state: IStore) => ({
  user: state.oidc.user,
  careerDays: state.employees.careerDays,
  selectedEmployee: state.employees.selectedEmployee,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getCareerDayOfEmployee,
      addCareerDay,
      deleteCareerDay,
      getSelectedEmployee,
    },
    dispatch,
  );

export type ConnectProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
