import EMPLOYEES_LIST from './actionConstants';

const defaultState: IEmployeesState = {
  employees: null,
  careerDays: null,
  selectedCareerDay: null,
  selectedEmployee: null,
};

export default function(state: IEmployeesState = defaultState, {type, payload}: { type: string; payload: any }) {
  switch (type) {
    case EMPLOYEES_LIST.GET_EMPLOYEES_LIST:
      return handleGetEmployeesList(state, payload);

    case EMPLOYEES_LIST.GET_CAREER_DAYS:
      return handleGetCareerDaysOfEmployee(state, payload);

    case EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY:
      return handleGetSelectedCareerDay(state, payload);

    case EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE:
      return handleGetSelectedEmployee(state, payload);

    case EMPLOYEES_LIST.ADD_CAREER_DAY:
      return handleAddCareerDay(state, payload);

    case EMPLOYEES_LIST.ADD_OBJECTIVE:
      return handleAddObjective(state, payload);

    case EMPLOYEES_LIST.DELETE_CAREER_DAY:
      return handleDeleteCareerDay(state, payload);

    default:
      return state;
  }
}

function handleGetEmployeesList(state: IEmployeesState, employees: IEmployee) {
  return {...state, employees};
}

function handleGetCareerDaysOfEmployee(state: IEmployeesState, careerDays: ICareerDayOfEmployee) {
  return {...state, careerDays};
}

function handleGetSelectedCareerDay(state: IEmployeesState, selectedCareerDay: ICareerDayOfEmployee) {
  return {...state, selectedCareerDay};
}

function handleGetSelectedEmployee(state: IEmployeesState, selectedEmployee: IEmployee) {
  return {...state, selectedEmployee};
}

function handleAddCareerDay(state: IEmployeesState, newCareerDay: ICareerDayOfEmployee) {
  return {...state, careerDays: [newCareerDay, ...state.careerDays]};
}

function handleAddObjective(state: IEmployeesState, objective: IObjective) {
  const updatedSelectedCareerDay = {...state.selectedCareerDay};
  updatedSelectedCareerDay.Objectives.push(objective);

  return {...state, selectedCareerDay: updatedSelectedCareerDay};
}

function handleDeleteCareerDay(state: IEmployeesState, careerDayId: number) {
  const newCareerDaysList = state.careerDays.filter(careerDay => careerDay.id !== careerDayId );
  return {...state, careerDays: newCareerDaysList};
}

export interface IEmployee {
  id: number;
  Roles: string;
  LastName: string;
  FirstName: string;
  PhotoUrl: string;
  AccessToken: string;
}

export interface ICareerDayOfEmployee {
  id: number;
  Archived: boolean;
  EmployeeExternalId: string;
  UnitManagerExternalId: string;
  InterviewDate: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
  Objectives: null | IObjective[];
}

export interface IObjective {
  id: number;
  Title: string;
  Description: string;
  CareerDayId: number;
  StatusId: number;
  Progress: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface IObjectiveById {
  Title: string;
  Description: string;
  CareerDayId: number;
}

export interface IEmployeesState {
  employees: null | IEmployee[];
  careerDays: null | ICareerDayOfEmployee[];
  selectedCareerDay: null | ICareerDayOfEmployee;
  selectedEmployee: null | IEmployee;
}

export interface ICareerDay {
  EmployeeExternalId: number;
  UnitManagerExternalId: number;
  InterviewDate: Date;
}
