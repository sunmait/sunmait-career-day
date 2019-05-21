import { connect } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import { 
  getFreeEmployeesList,
  updateFreeEmployeesList,
 } from '../../../redux/modules/employees/actions';
 import { getFreeEmployeesSelector } from '../../../redux/modules/employees/selectors'

const mapStateToProps = (state: IStore) => ({
  freeEmployees: getFreeEmployeesSelector(state),
});

const mapDispatchToProps = {
  getFreeEmployeesList,
  updateFreeEmployeesList,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ConnectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
);
