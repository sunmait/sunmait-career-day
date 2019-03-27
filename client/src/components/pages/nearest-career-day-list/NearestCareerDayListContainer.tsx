import { connect } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import {
  getNearestCareerDay
} from '../../../redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  nearestCareerDay: state.employees.nearestCareerDay
});

const mapDispatchToProps = {
  getNearestCareerDay
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);