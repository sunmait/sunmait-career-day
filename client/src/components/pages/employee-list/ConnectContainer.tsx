import { connect } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import { getEmployeesList } from '../../../redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  employees: state.employees.employees,
});

const mapDispatchToProps = {
  getEmployeesList,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
