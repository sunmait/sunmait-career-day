import EMPLOYEES_LIST from './actionConstants';

const defaultState: IEmployeesState = {
  employees: null,
  careerDays: null,
  objectives: null,
  employeeFullName: null,
};

export default function(
  state: IEmployeesState = defaultState,
  {type, payload}: {type: string; payload: any},
) {
  switch (type) {
    case EMPLOYEES_LIST.GET_EMPLOYEES_LIST:
      return handleGetEmployeesList(state, payload);

    case EMPLOYEES_LIST.GET_CAREER_DAYS:
      return handleGetCareerDaysOfEmployee(state, payload);

    case EMPLOYEES_LIST.GET_OBJECTIVES:
      return handleGetObjectives(state, payload);

    default:
      return state;
  }
}

function handleGetEmployeesList(state: IEmployeesState, employees: IEmployees) {
  return {...state, employees};
}

function handleGetCareerDaysOfEmployee(
  state: IEmployeesState,
  payload: {careerDays: ICareerDaysOfEmployee} & {employeeFullName: string},
) {
  return {
    ...state,
    careerDays: payload.careerDays,
    employeeFullName: payload.employeeFullName,
  };
}

function handleGetObjectives(state: IEmployeesState, objectives: IObjectives) {
  return {...state, objectives};
}

export interface IEmployees {
  id: number;
  Roles: string;
  LastName: string;
  FirstName: string;
  PhotoUrl: string;
  AccessToken: string;
}

export interface ICareerDaysOfEmployee {
  id: number;
  Archived: boolean;
  EmployeeExternalId: string;
  UnitManagerExternalId: string;
  InterviewDate: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IObjectives {
  id: number;
  Title: string;
  Description: string;
  CareerDayId: number;
  StatusId: number;
  Progress: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IEmployeesState {
  employees: null | IEmployees[];
  careerDays: null | ICareerDaysOfEmployee[];
  objectives: null | IObjectives[];
  employeeFullName: null | string;
}
