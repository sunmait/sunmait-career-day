import { connect, ResolveThunks } from 'react-redux';
import { IStore } from '../../../../redux/rootReducer';
import {
  getActiveCareerDay,
  updateObjectiveEmployee,
} from '../../../../redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  user: state.oidc.user,
  activeCareerDay: state.employees.selectedCareerDay,
  loadCarreerDayForEmployee: state.employees.loadCarreerDayForEmployee,
});

const mapDispatchToProps = {
  getActiveCareerDay,
  updateObjectiveEmployee,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  ResolveThunks<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
