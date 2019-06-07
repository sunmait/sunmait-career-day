import { IObjective } from './reducer';
import EMPLOYEES_ACTION_TYPES from './actionConstants';

const defaultState: IEmployeesState = {
  employees: null,
  freeEmployees: null,
  careerDays: null,
  selectedCareerDay: null,
  selectedEmployee: null,
  loadCarreerDayForEmployee: false,
  loadEmployeesList: false,
  loadSelectedCareerDay: false,
  nearestCareerDays: null,
};

export default function(
  state: IEmployeesState = defaultState,
  { type, payload }: IEmployeesAction,
) {
  switch (type) {
    case EMPLOYEES_ACTION_TYPES.LOAD_CAREER_DAY_FOR_EMPLOYEE:
      return loadCarreerDayForEmployee(state, payload);

    case EMPLOYEES_ACTION_TYPES.LOAD_SELECTED_CAREER_DAY:
      return loadSelectedCareerDay(state, payload);

    case EMPLOYEES_ACTION_TYPES.LOAD_EMPLOYEES_LIST:
      return loadEmployeesList(state, payload);

    case EMPLOYEES_ACTION_TYPES.GET_EMPLOYEES_LIST_SUCCESS:
      return handleGetEmployeesList(state, payload);

    case EMPLOYEES_ACTION_TYPES.GET_CAREER_DAYS_SUCCESS:
      return handleGetCareerDaysOfEmployee(state, payload);

    case EMPLOYEES_ACTION_TYPES.GET_ACTIVE_CAREER_DAY_SUCCESS:
      return handleGetActiveCareerDay(state, payload);

    case EMPLOYEES_ACTION_TYPES.GET_FREE_EMPLOYEES_LIST_SUCCESS:
      return handleGetFreeEmployeesList(state, payload);

    case EMPLOYEES_ACTION_TYPES.UPDATE_FREE_EMPLOYEES_LIST_SUCCESS:
      return handleUpdateFreeEmployeesList(state, payload);

    case EMPLOYEES_ACTION_TYPES.GET_SELECTED_CAREER_DAY_SUCCESS:
      return handleGetSelectedCareerDay(state, payload);

    case EMPLOYEES_ACTION_TYPES.GET_SELECTED_EMPLOYEE_SUCCESS:
      return handleGetSelectedEmployee(state, payload);

    case EMPLOYEES_ACTION_TYPES.GET_NEAREST_CAREER_DAYS_SUCCESS:
      return handleGetNearestCareerDays(state, payload);

    case EMPLOYEES_ACTION_TYPES.ADD_CAREER_DAY:
      return handleAddCareerDay(state, payload);

    case EMPLOYEES_ACTION_TYPES.ADD_OBJECTIVE:
      return handleAddObjective(state, payload);

    case EMPLOYEES_ACTION_TYPES.DELETE_CAREER_DAY:
      return handleDeleteCareerDay(state, payload);

    case EMPLOYEES_ACTION_TYPES.UPDATE_OBJECTIVE_MANAGER:
      return handleUpdateObjective(state, payload);

    case EMPLOYEES_ACTION_TYPES.UPDATE_OBJECTIVE_EMPLOYEE:
      return handleUpdateObjective(state, payload);

    case EMPLOYEES_ACTION_TYPES.DELETE_OBJECTIVE:
      return handleDeleteObjective(state, payload);

    case EMPLOYEES_ACTION_TYPES.ARCHIVE_CAREER_DAY:
      return handleArchiveCareerDay(state, payload);

    case EMPLOYEES_ACTION_TYPES.UPDATE_INTERVIEW_DATETIME:
      return handleUpdateInterviewDate(state, payload);

    default:
      return state;
  }
}

function loadSelectedCareerDay(state: IEmployeesState, loadSelectedCareerDay: boolean) {
  return {
    ...state,
    loadSelectedCareerDay,
  };
}

function loadEmployeesList(state: IEmployeesState, loadEmployeesList: boolean) {
  return {
    ...state,
    loadEmployeesList,
  };
}

function loadCarreerDayForEmployee(state: IEmployeesState, loadCarreerDayForEmployee: boolean) {
  return {
    ...state,
    loadCarreerDayForEmployee,
  };
}

function handleGetEmployeesList(state: IEmployeesState, employees: IEmployee[]) {
  return { ...state, employees };
}

function handleGetCareerDaysOfEmployee(state: IEmployeesState, careerDays: ICareerDayOfEmployee[]) {
  return { ...state, careerDays };
}

function handleGetSelectedCareerDay(
  state: IEmployeesState,
  selectedCareerDay: ICareerDayOfEmployee,
) {
  return { ...state, selectedCareerDay };
}

function handleGetActiveCareerDay(state: IEmployeesState, selectedCareerDay: ICareerDayOfEmployee) {
  return { ...state, selectedCareerDay };
}

function handleGetFreeEmployeesList(state: IEmployeesState, freeEmployees: IEmployee[]) {
  return { ...state, freeEmployees };
}

function handleUpdateFreeEmployeesList(state: IEmployeesState, freeEmployees: IEmployee[]) {
  return { ...state, freeEmployees };
}

function handleGetSelectedEmployee(state: IEmployeesState, selectedEmployee: IEmployee) {
  return { ...state, selectedEmployee };
}

function handleGetNearestCareerDays(
  state: IEmployeesState,
  nearestCareerDays: INearestCareerDay[],
) {
  return { ...state, nearestCareerDays };
}

function handleAddCareerDay(state: IEmployeesState, newCareerDay: ICareerDayOfEmployee) {
  const careerDays = state.careerDays || [];
  return { ...state, careerDays: [newCareerDay, ...careerDays] };
}

function handleAddObjective(state: IEmployeesState, selectedCareerDay: ICareerDayOfEmployee) {
  return { ...state, selectedCareerDay };
}

function handleDeleteCareerDay(state: IEmployeesState, careerDayId: number) {
  const careerDays = state.careerDays || [];
  const newCareerDaysList = careerDays.filter(careerDay => careerDay.id !== careerDayId);

  return { ...state, careerDays: newCareerDaysList };
}

function handleDeleteObjective(state: IEmployeesState, selectedCareerDay: ICareerDayOfEmployee) {
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
    Objectives: (selectedCareerDay.Objectives || []).reduce((result: IObjective[], item) => {
      if (item.id === objective.id) {
        return [...result, objective];
      }
      return [...result, item];
    }, []),
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
  assigned?: boolean;
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
  ManagerFirstName: string;
  ManagerLastName: string;
}

export interface INearestCareerDay {
  id: number;
  Archived: boolean;
  EmployeeId: string;
  UnitManagerId: string;
  InterviewDate: Date;
  FirstName: string;
  LastName: string;
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
  EmployeeId: string;
  UnitManagerId: string;
}

export interface IEmployeesState {
  freeEmployees: null | IEmployee[];
  employees: null | IEmployee[];
  careerDays: null | ICareerDayOfEmployee[];
  selectedCareerDay: null | ICareerDayOfEmployee;
  selectedEmployee: null | IEmployee;
  loadCarreerDayForEmployee: boolean;
  loadEmployeesList: boolean;
  loadSelectedCareerDay: boolean;
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
  progress: number;
}

export interface IUpdateInterviewDate {
  id: number;
  date: Date;
  EmployeeId: string;
  UnitManagerId: string;
}

export interface IEmployeesAction {
  type: EMPLOYEES_ACTION_TYPES;
  payload?: any;
}
