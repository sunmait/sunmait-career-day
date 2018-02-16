import EMPLOYEES_LIST from './employeesActionConstants';

export interface IEmployees {
  id: number;
  photoUrl: string;
  fullName: string;
  archived: boolean;
}

export interface ICareerDaysOfEmployee {
  id: string;
  Archived: boolean;
  EmployeeExternalId: string;
  UnitManagerExternalId: string;
  InterviewDate: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IEmployeeFullName {
  employeeFullName: string;
}

export interface IUserID {
  userId: string;
}

export interface IEmployeesState {
  employees: null | IEmployees[];
  careerDays: null | ICareerDaysOfEmployee[];
  employeeFullName: null | IEmployeeFullName;
}

const defaultState: IEmployeesState = {
  employees: null,
  careerDays: null,
  employeeFullName: null,
};

export default function(state: IEmployeesState = defaultState, {type, payload}: { type: string, payload: any }) {
  switch (type) {
    case EMPLOYEES_LIST.GET_EMPLOYEES_LIST:
      return handleGetEmployeesList(state, payload);

    case EMPLOYEES_LIST.GET_CAREER_DAYS:
      return handleGetCareerDaysOfEmployee(state, payload);

    default:
      return state;
  }
}

function handleGetEmployeesList(state: IEmployeesState, employees: IEmployees) {
  return {...state, employees};
}

function handleGetCareerDaysOfEmployee(
  state: IEmployeesState,
  payload: { careerDays: ICareerDaysOfEmployee } & IUserID) {

  const currentId = parseInt(payload.userId, 10);
  const currentNumberEmployee = state.employees.findIndex((item: IEmployees) => item.id === currentId);
  const employeeFullName = state.employees[currentNumberEmployee].fullName;

  return {...state, careerDays: payload.careerDays, employeeFullName};
}
