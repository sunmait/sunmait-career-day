import { IObjective } from './reducer';
import EMPLOYEES_LIST from './actionConstants';

const defaultState: IEmployeesState = {
  employees: null,
  careerDays: null,
  selectedCareerDay: null,
  selectedEmployee: null,
  nearestCareerDays: null,
};

export default function (
  state: IEmployeesState = defaultState,
  { type, payload }: IEmployeesAction,
) {
  switch (type) {
    case EMPLOYEES_LIST.GET_EMPLOYEES_LIST_SUCCESS:
      return handleGetEmployeesList(state, payload);

    case EMPLOYEES_LIST.GET_CAREER_DAYS:
      return handleGetCareerDaysOfEmployee(state, payload);

    case EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY_SUCCESS:
      return handleGetActiveCareerDay(state, payload);

    case EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY_SUCCESS:
      return handleGetSelectedCareerDay(state, payload);

    case EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE:
      return handleGetSelectedEmployee(state, payload);

    case EMPLOYEES_LIST.GET_NEAREST_CAREER_DAYS_SUCCESS:
      return handleGetNearestCareerDays(state, payload);

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

    case EMPLOYEES_LIST.COMPLETE_OBJECTIVE_MANAGER_SUCCESS:
      return handleUpdateObjective(state, payload);

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
  careerDays: ICareerDayOfEmployee[],
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

function handleGetNearestCareerDays(
  state: IEmployeesState,
  nearestCareerDays: INearestCareerDay[]
) {
  return { ...state, nearestCareerDays }
}

function handleAddCareerDay(
  state: IEmployeesState,
  newCareerDay: ICareerDayOfEmployee,
) {
  const careerDays = state.careerDays || [];
  return { ...state, careerDays: [newCareerDay, ...careerDays] };
}

function handleAddObjective(
  state: IEmployeesState,
  selectedCareerDay: ICareerDayOfEmployee,
) {
  return { ...state, selectedCareerDay };
}

function handleDeleteCareerDay(state: IEmployeesState, careerDayId: number) {
  const careerDays = state.careerDays || [];
  const newCareerDaysList = careerDays.filter(
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

function handleArchiveCareerDay(
  state: IEmployeesState,
  payload: {
    careerDays: ICareerDayOfEmployee[];
    selectedCareerDay: ICareerDayOfEmployee;
  },
) {
  return {
    ...state,
    careerDays: payload.careerDays,
    selectedCareerDay: payload.selectedCareerDay,
  };
}

function handleUpdateObjective(state: IEmployeesState, objective: IObjective) {
  const { selectedCareerDay } = state;
  if (!selectedCareerDay) {
    return state;
  }
  const updatedSelectedCareerDay = {
    ...selectedCareerDay,
    Objectives: (selectedCareerDay.Objectives || []).reduce(
      (result: IObjective[], item) => {
        if (item.id === objective.id) {
          return [...result, objective];
        }
        return [...result, item];
      },
      [],
    ),
  };

  return { ...state, selectedCareerDay: updatedSelectedCareerDay };
}

function handleUpdateInterviewDate(
  state: IEmployeesState,
  selectedCareerDay: ICareerDayOfEmployee,
) {
  return { ...state, selectedCareerDay };
}

export interface IEmployee {
  id: string;
  Role: string;
  LastName: string;
  FirstName: string;
  PhotoUrl: string;
  ActiveCareerDay: ICareerDay | null;
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
  ManagerFirstName: string,
  ManagerLastName: string,
}

export interface INearestCareerDay {
  id: number;
  Archived: boolean;
  EmployeeId: string;
  UnitManagerId: string;
  InterviewDate: Date;
  FirstName: string,
  LastName: string,
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
  ProgressObjective: null | IProgressObjectve[];
}

export interface IObjectiveById {
  Title: string;
  Description: string;
  CareerDayId: number;
  EmployeeId: string;
  UnitManagerId: string;
}

export interface IEmployeesState {
  employees: null | IEmployee[];
  careerDays: null | ICareerDayOfEmployee[];
  selectedCareerDay: null | ICareerDayOfEmployee;
  selectedEmployee: null | IEmployee;
  nearestCareerDays: null | INearestCareerDay[];
}

export interface ICareerDay {
  EmployeeId: string;
  UnitManagerId: string;
  InterviewDate: Date;
}

export interface IArchiveCareerDay {
  id: number;
  UnitManagerId: string;
}

export interface IUpdateObjectiveManager {
  id: number;
  title: string;
  description: string;
}

export interface IUpdateObjectiveEmployee {
  id: number;
  progress: IProgressObjectve;
}

export interface IUpdateInterviewDate {
  id: number;
  date: Date;
  EmployeeId: string;
  UnitManagerId: string;
}

export interface IEmployeesAction {
  type: EMPLOYEES_LIST;
  payload?: any;
}

export interface IProgressObjectve{
  id?: number;
  ObjectiveId: number;
  Progress: number;
  Description: string;
}

