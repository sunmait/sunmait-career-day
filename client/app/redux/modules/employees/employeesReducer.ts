import EMPLOYEES_LIST from './employeesActionConstants';

export interface IEmployees {
  id: number;
<<<<<<< HEAD
  photoUrl: string;
  fullName: string;
  archived: boolean;
=======
  avatar: string;
  fullName: string;
  isActive: boolean;
>>>>>>> d161a6f... manager page was added in route+additions to tslint config
}

export interface IEmployeesState {
  profile: {} | IEmployees;
}

const defaultState: IEmployeesState = {
  profile: {},
};

export default function(state: IEmployeesState = defaultState, {type, payload}: { type: string, payload: any }) {
  switch (type) {
    case
    EMPLOYEES_LIST.GET_EMPLOYEES_LIST:
      return handleGetEmployeesList(state, payload);

    default:
      return state;
  }
}

function handleGetEmployeesList(state: IEmployeesState, profile: IEmployees) {
  return {...state, profile};
}