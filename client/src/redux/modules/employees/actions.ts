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

export const getEmployeesList = () => async (dispatch: Dispatch) => {
  const res = await sendRequestHelper.get<IEmployee[]>('/api/users/employees');
  return dispatch({
    type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
    payload: res.data,
  });
};

export const getCareerDayOfEmployee = (employeeId: number) => async (
  dispatch: Dispatch,
) => {
  const res = await sendRequestHelper.get<ICareerDayOfEmployee[]>(
    `/api/career-days/${employeeId}`,
  );
  return dispatch({
    type: EMPLOYEES_LIST.GET_CAREER_DAYS,
    payload: res.data,
  });
};

export const getSelectedCareerDay = (careerDayId: number) => async (
  dispatch: Dispatch,
) => {
  const res = await sendRequestHelper.get<ICareerDayOfEmployee>(
    `/api/objectives/${careerDayId}`,
  );
  return dispatch({
    type: EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY,
    payload: res.data,
  });
};

export const getActiveCareerDay = (employeeId: number) => async (
  dispatch: Dispatch,
) => {
  const res = await sendRequestHelper.get<ICareerDayOfEmployee>(
    `/api/career-days/active-day/${employeeId}`,
  );
  return dispatch({
    type: EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY,
    payload: res.data,
  });
};

export const getSelectedEmployee = (employeeId: number) => async (
  dispatch: Dispatch,
) => {
  const res = await sendRequestHelper.get<IEmployee>(
    `/api/users/selected-employee/${employeeId}`,
  );
  return dispatch({
    type: EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE,
    payload: res.data,
  });
};

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
