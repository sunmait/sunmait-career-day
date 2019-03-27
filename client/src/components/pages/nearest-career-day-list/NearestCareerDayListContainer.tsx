import { connect } from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import {
  getNearestCareerDays
} from '../../../redux/modules/employees/actions';

const mapStateToProps = (state: IStore) => ({
  nearestCareerDays: state.employees.nearestCareerDays
});

const mapDispatchToProps = {
  getNearestCareerDays
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);