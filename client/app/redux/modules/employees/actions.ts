import * as axios from 'axios';
import EMPLOYEES_LIST from './actionConstants';
import APP_ACTIONS from '../app/actionConstants';
import { Dispatch } from 'redux/store';
import {
  IEmployee,
  ICareerDayOfEmployee,
  ICareerDay,
  IArchiveCareerDay,
  IObjectiveById,
  IUpdateObjective,
  IUpdateInterviewDate,
} from './reducer';

const axiosRequest: any = axios;

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
  return axiosRequest.get('/api/users/employees')
    .then((res: axios.AxiosResponse<IEmployee[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type GetCareerDaysOfEmployee = (employee: IEmployee) => (dispatch: Dispatch) => void;
export const getCareerDayOfEmployee: GetCareerDaysOfEmployee = (employee: IEmployee) => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/career-days/${employee.id}`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_CAREER_DAYS,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type GetSelectedCareerDay = (careerDayId: number) => (dispatch: Dispatch) => void;
export const getSelectedCareerDay: GetSelectedCareerDay = (careerDayId: number) => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/objectives/${careerDayId}`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type GetActiveCareerDay = (employeeId: number) => (dispatch: Dispatch) => void;
export const getActiveCareerDay: GetActiveCareerDay = (employeeId: number) => (dispatch: Dispatch) => {
  return axiosRequest.get(`/api/career-days/active-day/${employeeId}`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY,
        payload: res.data,
      });
    });
};

export type GetSelectedEmployee = (employee: IEmployee) => (dispatch: Dispatch) => void;
export const getSelectedEmployee: GetSelectedEmployee = (employee: IEmployee) => (dispatch: Dispatch) => {
  dispatch({
    type: EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE,
    payload: employee,
  });
};

export type AddCareerDay = (careerDay: ICareerDay) => (dispatch: Dispatch) => void;
export const addCareerDay: AddCareerDay = (careerDay: ICareerDay) => (dispatch: Dispatch) => {
  return axiosRequest.post(`/api/career-days`, careerDay)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.ADD_CAREER_DAY,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type AddObjective = (objective: IObjectiveById) => (objective: Dispatch) => void;
export const addObjective: AddObjective = (objective: IObjectiveById) => (dispatch: Dispatch) => {

  return axiosRequest.post(`/api/objectives`, objective)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.ADD_OBJECTIVE,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type DeleteCareerDay = (careerDayId: number) => (dispatch: Dispatch) => void;
export const deleteCareerDay: DeleteCareerDay = (careerDayId: number) => (dispatch: Dispatch) => {
  return axiosRequest.delete(`/api/career-days/${careerDayId}`)
    .then(() => {
      dispatch({
        type: EMPLOYEES_LIST.DELETE_CAREER_DAY,
        payload: careerDayId,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type UpdateObjective = (objective: IUpdateObjective) => (dispatch: Dispatch) => void;
export const updateObjective: UpdateObjective = (objective: IUpdateObjective) => (dispatch: Dispatch) => {
  return axiosRequest.patch(`/api/objectives/${objective.id}`, {
    title: objective.title,
    description: objective.description,
  })
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.UPDATE_OBJECTIVE,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type ArchiveCareerDay = (careerDay: IArchiveCareerDay) => (dispatch: Dispatch) => void;
export const archiveCareerDay: ArchiveCareerDay = (careerDay: IArchiveCareerDay) => (dispatch: Dispatch) => {
  return axiosRequest.patch(`/api/career-days/archive/${careerDay.id}`, careerDay)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.ARCHIVE_CAREER_DAY,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type UpdateInterviewDate = (datetime: IUpdateInterviewDate) => (dispatch: Dispatch) => void;
export const updateInterviewDate: UpdateInterviewDate = (datetime: IUpdateInterviewDate) => (dispatch: Dispatch) => {
  return axiosRequest.patch(`/api/career-days/update-date/${datetime.id}`, datetime)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.UPDATE_INTERVIEW_DATETIME,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};

export type DeleteObjective = (objectiveId: number) => (dispatch: Dispatch) => void;
export const deleteObjective: DeleteObjective = (objectiveId: number) => (dispatch: Dispatch) => {
  return axiosRequest.delete(`/api/objectives/${objectiveId}`)
    .then(() => {
      dispatch({
        type: EMPLOYEES_LIST.DELETE_OBJECTIVE,
        payload: objectiveId,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: {status: err.response.status, message: err.response.statusText},
      });

      return err;
    });
};
