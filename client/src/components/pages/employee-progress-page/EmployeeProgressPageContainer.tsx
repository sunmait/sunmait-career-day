import { connect, ResolveThunks } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import {
  getCareerDayOfEmployee,
  addCareerDay,
  deleteCareerDay,
  getSelectedEmployee,
} from '../../../redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  user: state.oidc.user,
  careerDays: state.employees.careerDays,
  selectedEmployee: state.employees.selectedEmployee,
  loadCarreerDayForEmployee: state.employees.loadCarreerDayForEmployee,
});

const mapDispatchToProps = {
  getCareerDayOfEmployee,
  addCareerDay,
  deleteCareerDay,
  getSelectedEmployee,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
ResolveThunks<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
