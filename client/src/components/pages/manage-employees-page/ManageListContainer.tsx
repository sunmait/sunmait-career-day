import { connect } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import { 
  getFreeEmployeesList,
  updateFreeEmployeesList,
 } from '../../../redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  freeEmployees: state.employees.freeEmployees,
});

const mapDispatchToProps = {
  getFreeEmployeesList,
  updateFreeEmployeesList,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
