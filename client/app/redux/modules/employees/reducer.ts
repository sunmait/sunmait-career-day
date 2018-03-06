import EMPLOYEES_LIST from './actionConstants';

const defaultState: IEmployeesState = {
  employees: null,
  careerDays: null,
  selectedCareerDay: null,
  selectedEmployee: null,
};

export default function(state: IEmployeesState = defaultState, { type, payload }: { type: string; payload: any }) {
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

    case EMPLOYEES_LIST.UPDATE_OBJECTIVE:
      return handleUpdateObjective(state, payload);

<<<<<<< HEAD
    case EMPLOYEES_LIST.DELETE_OBJECTIVE:
      return handleDeleteObjective(state, payload);

    case EMPLOYEES_LIST.ARCHIVE_CAREER_DAY:
      return handleArchiveCareerDay(state, payload);
=======
    case EMPLOYEES_LIST.ARCHIVE_CAREER_DAY:
<<<<<<< HEAD
    return handleArchiveCareerDay(state, payload);
>>>>>>> cb6ec73... added archive action for career days
=======
      return handleArchiveCareerDay(state, payload);

    case EMPLOYEES_LIST.DELETE_OBJECTIVE:
      return handleDeleteObjective(state, payload);
>>>>>>> c0e4dc6... added removing objective

    default:
      return state;
  }
}

function handleGetEmployeesList(state: IEmployeesState, employees: IEmployee) {
  return { ...state, employees };
}

function handleGetCareerDaysOfEmployee(state: IEmployeesState, careerDays: ICareerDayOfEmployee) {
  return { ...state, careerDays };
}

function handleGetSelectedCareerDay(state: IEmployeesState, selectedCareerDay: ICareerDayOfEmployee) {
  return { ...state, selectedCareerDay };
}

function handleGetSelectedEmployee(state: IEmployeesState, selectedEmployee: IEmployee) {
  return { ...state, selectedEmployee };
}

function handleAddCareerDay(state: IEmployeesState, newCareerDay: ICareerDayOfEmployee) {
  return { ...state, careerDays: [newCareerDay, ...state.careerDays] };
}

function handleAddObjective(state: IEmployeesState, objective: IObjective) {
  const updatedSelectedCareerDay = { ...state.selectedCareerDay };
  updatedSelectedCareerDay.Objectives.push(objective);

  return { ...state, selectedCareerDay: updatedSelectedCareerDay };
}

function handleDeleteCareerDay(state: IEmployeesState, careerDayId: number) {
  const newCareerDaysList = state.careerDays.filter(careerDay => careerDay.id !== careerDayId);

  return { ...state, careerDays: newCareerDaysList };
}

function handleDeleteObjective(state: IEmployeesState, objectiveId: number) {
  const newSelectedCareerDay = { ...state.selectedCareerDay };
  newSelectedCareerDay.Objectives.find((objective: IObjective, index: number): boolean => {
    if (objective.id === objectiveId) {
      newSelectedCareerDay.Objectives.splice(index, 1);

      return true;
    }
    return false;
  });

  return { ...state, selectedCareerDay: newSelectedCareerDay };
}

function handleArchiveCareerDay(state: IEmployeesState, newCareerDay: ICareerDayOfEmployee) {
  const newCareerDaysList = state.careerDays.map((item: ICareerDayOfEmployee) => {
    if (item.id === newCareerDay.id) {
      return newCareerDay;
    } else {
      return item;
    }
  });

  return { ...state, careerDays: newCareerDaysList, selectedCareerDay: newCareerDay };
}

function handleUpdateObjective(state: IEmployeesState, objective: IObjective) {
  const updatedSelectedCareerDay = { ...state.selectedCareerDay };
  updatedSelectedCareerDay.Objectives.find((item: IObjective, index: number): boolean => {
    if (item.id === objective.id) {
      updatedSelectedCareerDay.Objectives[index] = objective;

      return true;
    }
    return false;
  });

  return { ...state, selectedCareerDay: updatedSelectedCareerDay };
}

function handleDeleteObjective(state: IEmployeesState, objectiveId: number) {
  const newSelectedCareerDay = { ...state.selectedCareerDay };
  newSelectedCareerDay.Objectives.find((objective: IObjective, index: number): boolean => {
    if (objective.id === objectiveId) {
      newSelectedCareerDay.Objectives.splice(index, 1);

      return true;
    }
    return false;
  });

  return { ...state, selectedCareerDay: newSelectedCareerDay };
}

function handleArchiveCareerDay(state: IEmployeesState, newCareerDay: ICareerDayOfEmployee) {
  const newCareerDaysList = state.careerDays.map((item: ICareerDayOfEmployee) => {
    if (item.id === newCareerDay.id) {
      return newCareerDay;
    } else {
      return item;
    }
  });

  return { ...state, careerDays: newCareerDaysList, selectedCareerDay: newCareerDay };
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

export interface IUpdateObjective {
  title: string;
  description: string;
  objectiveId: number;
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

export interface IUpdateObjective {
  id: number;
  title: string;
  description: string;
}
