import { connect } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import {
  getCareerDayOfEmployee,
  addCareerDay,
  deleteCareerDay,
  getSelectedEmployee,
} from '../../../redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  careerDays: state.employees.careerDays,
  selectedEmployee: state.employees.selectedEmployee,
});

const mapDispatchToProps = {
  getCareerDayOfEmployee,
  addCareerDay,
  deleteCareerDay,
  getSelectedEmployee,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
