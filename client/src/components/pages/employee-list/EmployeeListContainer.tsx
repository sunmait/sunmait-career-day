import { connect } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import {
  getEmployeesList,
  getNearestCareerDay
} from '../../../redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  employees: state.employees.employees,
  nearestCareerDay: state.employees.nearestCareerDay
});

const mapDispatchToProps = {
  getEmployeesList,
  getNearestCareerDay
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
