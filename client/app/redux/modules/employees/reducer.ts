import EMPLOYEES_LIST from './actionConstants';

const defaultState: IEmployeesState = {
  employees: null,
  careerDays: null,
  selectedCareerDay: null,
  selectedEmployee: null,
};

export default function(
  state: IEmployeesState = defaultState,
  { type, payload }: { type: EMPLOYEES_LIST; payload: any },
) {
  switch (type) {
    case EMPLOYEES_LIST.GET_EMPLOYEES_LIST:
      return handleGetEmployeesList(state, payload);

    case EMPLOYEES_LIST.GET_CAREER_DAYS:
      return handleGetCareerDaysOfEmployee(state, payload);

    case EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY:
      return handleGetActiveCareerDay(state, payload);

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

    case EMPLOYEES_LIST.UPDATE_OBJECTIVE_MANAGER:
      return handleUpdateObjective(state, payload);

    case EMPLOYEES_LIST.UPDATE_OBJECTIVE_EMPLOYEE:
      return handleUpdateObjective(state, payload);

    case EMPLOYEES_LIST.DELETE_OBJECTIVE:
      return handleDeleteObjective(state, payload);

    case EMPLOYEES_LIST.ARCHIVE_CAREER_DAY:
      return handleArchiveCareerDay(state, payload);

    case EMPLOYEES_LIST.UPDATE_INTERVIEW_DATETIME:
      return handleUpdateInterviewDate(state, payload);

    default:
      return state;
  }
}

function handleGetEmployeesList(
  state: IEmployeesState,
  employees: IEmployee[],
) {
  return { ...state, employees };
}

function handleGetCareerDaysOfEmployee(
  state: IEmployeesState,
  careerDays: ICareerDayOfEmployee,
) {
  return { ...state, careerDays };
}

function handleGetSelectedCareerDay(
  state: IEmployeesState,
  selectedCareerDay: ICareerDayOfEmployee,
) {
  return { ...state, selectedCareerDay };
}

function handleGetActiveCareerDay(
  state: IEmployeesState,
  selectedCareerDay: ICareerDayOfEmployee,
) {
  return { ...state, selectedCareerDay };
}

function handleGetSelectedEmployee(
  state: IEmployeesState,
  selectedEmployee: IEmployee,
) {
  return { ...state, selectedEmployee };
}

function handleAddCareerDay(
  state: IEmployeesState,
  newCareerDay: ICareerDayOfEmployee,
) {
  return { ...state, careerDays: [newCareerDay, ...state.careerDays] };
}

function handleAddObjective(
  state: IEmployeesState,
  selectedCareerDay: IObjective,
) {
  return { ...state, selectedCareerDay };
}

function handleDeleteCareerDay(state: IEmployeesState, careerDayId: number) {
  const newCareerDaysList = state.careerDays.filter(
    careerDay => careerDay.id !== careerDayId,
  );

  return { ...state, careerDays: newCareerDaysList };
}

function handleDeleteObjective(
  state: IEmployeesState,
  selectedCareerDay: ICareerDayOfEmployee,
) {
  return { ...state, selectedCareerDay };
}

function handleArchiveCareerDay(state: IEmployeesState, payload: any) {
  return {
    ...state,
    careerDays: payload.careerDay,
    selectedCareerDay: payload.selectedCareerDay,
  };
}

function handleUpdateObjective(state: IEmployeesState, objective: IObjective) {
  const updatedSelectedCareerDay = { ...state.selectedCareerDay };
  updatedSelectedCareerDay.Objectives.find(
    (item: IObjective, index: number): boolean => {
      if (item.id === objective.id) {
        updatedSelectedCareerDay.Objectives[index] = objective;

        return true;
      }
      return false;
    },
  );

  return { ...state, selectedCareerDay: updatedSelectedCareerDay };
}

function handleUpdateInterviewDate(
  state: IEmployeesState,
  selectedCareerDay: ICareerDayOfEmployee,
) {
  return { ...state, selectedCareerDay };
}

export interface IEmployee {
  id: number;
  Role: string;
  LastName: string;
  FirstName: string;
  PhotoUrl: string;
  AccessToken: string;
}

export interface ICareerDayOfEmployee {
  id: number;
  Archived: boolean;
  EmployeeId: string;
  UnitManagerId: string;
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
  EmployeeId: number;
  UnitManagerId: number;
}

export interface IEmployeesState {
  employees: null | IEmployee[];
  careerDays: null | ICareerDayOfEmployee[];
  selectedCareerDay: null | ICareerDayOfEmployee;
  selectedEmployee: null | IEmployee;
}

export interface ICareerDay {
  EmployeeId: number;
  UnitManagerId: number;
  InterviewDate: Date;
}

export interface IArchiveCareerDay {
  id: number;
  UnitManagerId: number;
}

export interface IUpdateObjectiveManager {
  id: number;
  title: string;
  description: string;
}

export interface IUpdateObjectiveEmployee {
  id: number;
  progress: number;
}

export interface IUpdateInterviewDate {
  id: number;
  date: Date;
  EmployeeId: number;
  UnitManagerId: number;
}
