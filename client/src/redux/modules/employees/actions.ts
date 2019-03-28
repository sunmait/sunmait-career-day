import EMPLOYEES_LIST from './actionConstants';
import { Dispatch, GetState } from '../../store';
import {
  IEmployee,
  ICareerDayOfEmployee,
  ICareerDay,
  IArchiveCareerDay,
  IObjectiveById,
  IUpdateObjectiveManager,
  IUpdateInterviewDate,
  IUpdateObjectiveEmployee,
  IObjective,
} from './reducer';
import sendRequestHelper from '../../../components/helper/API/sendRequestHelper';
import { action } from 'typesafe-actions'

export const getEmployeesList = () => action(
  EMPLOYEES_LIST.GET_EMPLOYEES_LIST
);

export const getNearestCareerDays = () => action(
  EMPLOYEES_LIST.GET_NEAREST_CAREER_DAYS,
);

export const getNearestCareerDaysSuccess = (nearestCareerDays: ICareerDayOfEmployee[]) => action(
  EMPLOYEES_LIST.GET_NEAREST_CAREER_DAYS_SUCCESS,
  nearestCareerDays
);

export const getEmployeesListSuccess = (employeelist: IEmployee[]) => action(
  EMPLOYEES_LIST.GET_EMPLOYEES_LIST_SUCCESS,
  employeelist,
);

export const getCareerDayOfEmployeeSuccess = (employeeId: IEmployee['id']) => action(EMPLOYEES_LIST.GET_CAREER_DAYS_SUCCESS, employeeId);

export const getCareerDayOfEmployee = (employeeId: IEmployee['id']) => action(EMPLOYEES_LIST.GET_CAREER_DAYS, employeeId);

export const getSelectedCareerDay = (careerDayId: ICareerDayOfEmployee['id']) => action(
  EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY,
  careerDayId
);

export const loadSelectedCareerDay = (loadSelectedCareerDay: boolean) =>
  action(EMPLOYEES_LIST.LOAD_SELECTED_CAREER_DAY,
    loadSelectedCareerDay,
  );

export const loadCarreerDayForEmployee = (loadCarreerDayForEmployee: boolean) =>
  action(EMPLOYEES_LIST.LOAD_CAREER_DAY_FOR_EMPLOYEE, loadCarreerDayForEmployee);

export const loadEmployeesList = (loadEmployeesList: boolean) =>
  action(EMPLOYEES_LIST.LOAD_EMPLOYEES_LIST, loadEmployeesList);

export const getSelectedCareerDaySuccess = (careerDay: ICareerDayOfEmployee) => action(
  EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY_SUCCESS,
  careerDay
);

export const getActiveCareerDay = (employeeId: IEmployee['id']) => action(
  EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY,
  employeeId,
);

export const getActiveCareerDaySuccess = (careerDay: ICareerDayOfEmployee) => action(
  EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY_SUCCESS,
  careerDay,
);

export const getSelectedEmployee = (employeeId: IEmployee['id']) => action(EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE, employeeId);

export const getSelectedEmployeeSuccess = (employeeId: IEmployee['id']) => action(EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE_SUCCESS, employeeId);

export const addCareerDay = (careerDay: ICareerDay) => async (
  dispatch: Dispatch,
) => {
  const res = await sendRequestHelper.post<ICareerDayOfEmployee>(
    `/api/career-days`,
    careerDay,
  );
  return dispatch({
    type: EMPLOYEES_LIST.ADD_CAREER_DAY,
    payload: res.data,
  });
};

export const addObjective = (objective: IObjectiveById) => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  const res = await sendRequestHelper.post<IObjective>(
    `/api/objectives`,
    objective,
  );
  const newObjective: IObjective = res.data;

  const { selectedCareerDay } = getState().employees;
  if (!selectedCareerDay) {
    return;
  }

  const updatedSelectedCareerDay = {
    ...selectedCareerDay,
    Objectives: selectedCareerDay.Objectives || [],
  };

  updatedSelectedCareerDay.Objectives.push(newObjective);

  return dispatch({
    type: EMPLOYEES_LIST.ADD_OBJECTIVE,
    payload: updatedSelectedCareerDay,
  });
};

export const deleteCareerDay = (careerDayId: number) => async (
  dispatch: Dispatch,
) => {
  await sendRequestHelper.delete(`/api/career-days/${careerDayId}`);
  return dispatch({
    type: EMPLOYEES_LIST.DELETE_CAREER_DAY,
    payload: careerDayId,
  });
};

export const updateObjectiveEmployee = (
  objective: IUpdateObjectiveEmployee,
) => async (dispatch: Dispatch) => {
  const res = await sendRequestHelper.patch<ICareerDayOfEmployee>(
    `/api/objectives/progress/${objective.id}`,
    {
      progress: objective.progress,
    },
  );
  return dispatch({
    type: EMPLOYEES_LIST.UPDATE_OBJECTIVE_EMPLOYEE,
    payload: res.data,
  });
};

export const updateObjectiveManager = (
  objective: IUpdateObjectiveManager,
) => async (dispatch: Dispatch) => {
  const res = await sendRequestHelper.patch<ICareerDayOfEmployee>(
    `/api/objectives/${objective.id}`,
    {
      title: objective.title,
      description: objective.description,
    },
  );
  return dispatch({
    type: EMPLOYEES_LIST.UPDATE_OBJECTIVE_MANAGER,
    payload: res.data,
  });
};

export const archiveCareerDay = (careerDay: IArchiveCareerDay) => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  const res = await sendRequestHelper.patch<ICareerDayOfEmployee>(
    `/api/career-days/archive/${careerDay.id}`,
  );
  const newCareerDay: ICareerDayOfEmployee = res.data;
  const { careerDays } = getState().employees;
  if (!careerDays) {
    return;
  }

  const newCareerDaysList = careerDays.map((item: ICareerDayOfEmployee) => {
    if (item.id === res.data.id) {
      return newCareerDay;
    }
    return item;
  });

  return dispatch({
    type: EMPLOYEES_LIST.ARCHIVE_CAREER_DAY,
    payload: { careerDays: newCareerDaysList, selectedCareerDay: res.data },
  });
};

export const updateInterviewDate = (datetime: IUpdateInterviewDate) => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  const res = await sendRequestHelper.patch<ICareerDayOfEmployee>(
    `/api/career-days/update-date/${datetime.id}`,
    datetime,
  );
  const { selectedCareerDay } = getState().employees;
  if (!selectedCareerDay) {
    return;
  }

  const updatedCareerDay = { ...selectedCareerDay };
  updatedCareerDay.InterviewDate = res.data.InterviewDate;
  updatedCareerDay.UpdatedAt = res.data.UpdatedAt;

  return dispatch({
    type: EMPLOYEES_LIST.UPDATE_INTERVIEW_DATETIME,
    payload: updatedCareerDay,
  });
};

export const deleteObjective = (objectiveId: number) => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  await sendRequestHelper.delete(`/api/objectives/${objectiveId}`);
  const { selectedCareerDay } = getState().employees;
  if (!selectedCareerDay) {
    return;
  }

  const newSelectedCareerDay = {
    ...selectedCareerDay,
    Objectives: selectedCareerDay.Objectives || [],
  };

  newSelectedCareerDay.Objectives.find(
    (objective: IObjective, index: number): boolean => {
      if (objective.id === objectiveId) {
        newSelectedCareerDay.Objectives.splice(index, 1);

        return true;
      }
      return false;
    },
  );

  return dispatch({
    type: EMPLOYEES_LIST.DELETE_OBJECTIVE,
    payload: newSelectedCareerDay,
  });
};