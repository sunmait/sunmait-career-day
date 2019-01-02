import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IStore } from '../../../redux/rootReducer';
import { getEmployeesList } from '../../../redux/modules/employees/actions';
import { Dispatch } from '../../../redux/store';

const mapStateToProps = (state: IStore) => ({
  employees: state.employees.employees,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getEmployeesList,
    },
    dispatch,
  );

export type ConnectProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
