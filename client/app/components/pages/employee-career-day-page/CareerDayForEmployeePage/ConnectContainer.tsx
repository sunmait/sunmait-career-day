import { connect } from 'react-redux';
import { IStore } from 'redux/rootReducer';
import { getActiveCareerDay, updateObjectiveEmployee } from 'redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  user: state.auth.user,
  activeCareerDay: state.employees.selectedCareerDay,
});

const mapDispatchToProps = {
  getActiveCareerDay,
  updateObjectiveEmployee,
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps);
