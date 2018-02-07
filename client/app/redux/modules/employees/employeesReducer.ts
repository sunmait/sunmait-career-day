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

export interface IEmployeesState {
  employees: {} | IEmployees;
  careerDays: {} | ICareerDaysOfEmployee;
}

const defaultState: IEmployeesState = {
  employees: {},
  careerDays: {},
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

function handleGetCareerDaysOfEmployee(state: IEmployeesState, careerDays: ICareerDaysOfEmployee) {
  return {...state, careerDays};
}
