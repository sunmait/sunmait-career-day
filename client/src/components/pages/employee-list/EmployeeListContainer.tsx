import { connect} from 'react-redux';
import { IStore } from '../../../redux/rootReducer';
import { Dispatch } from '../../../redux/store';
import EMPLOYEES_LIST from '../../../redux/modules/employees/actionConstants';

const mapStateToProps = (state: IStore) => ({
  employees: state.employees.employees,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getEmployeesList: () => dispatch({
      type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST
    }) 
  };
};

export type ConnectProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
