import * as axios from 'axios';
import EMPLOYEES_LIST from './actionConstants';
import APP_ACTIONS from '../app/actionConstants';
import store, { Dispatch } from 'redux/store';
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
import { verifyCredentials } from 'redux/modules/auth/actions';

const axiosRequest: any = axios;

export type GetEmployeesList = () => (dispatch: Dispatch) => void;
export const getEmployeesList: GetEmployeesList = () => (dispatch: Dispatch) => {
  // verifyCredentials(store.dispatch);

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
        payload: { status: err.response.status, message: err.response.statusText },
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
        payload: { status: err.response.status, message: err.response.statusText },
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
        payload: { status: err.response.status, message: err.response.statusText },
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
        payload: { status: err.response.status, message: err.response.statusText },
      });

      return err;
    });
};

export type AddObjective = (objective: IObjectiveById) => (objective: Dispatch) => void;
export const addObjective: AddObjective = (objective: IObjectiveById) => (dispatch: Dispatch) => {
  return axiosRequest.post(`/api/objectives`, objective)
    .then((res: axios.AxiosResponse<IObjective>) => {
      const newObjective: IObjective = res.data;
      const updatedSelectedCareerDay = { ...store.getState().employees.selectedCareerDay };

      updatedSelectedCareerDay.Objectives.push(newObjective);

      dispatch({
        type: EMPLOYEES_LIST.ADD_OBJECTIVE,
        payload: updatedSelectedCareerDay,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: { status: err.response.status, message: err.response.statusText },
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
        payload: { status: err.response.status, message: err.response.statusText },
      });

      return err;
    });
};

export type UpdateObjectiveEmployee = (objective: IUpdateObjectiveEmployee) => (dispatch: Dispatch) => void;
export const updateObjectiveEmployee: UpdateObjectiveEmployee = (objective: IUpdateObjectiveEmployee) =>
  (dispatch: Dispatch) => {
    return axiosRequest.patch(`/api/objectives/progress/${objective.id}`, {
      progress: objective.progress,
    })
      .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
        dispatch({
          type: EMPLOYEES_LIST.UPDATE_OBJECTIVE_EMPLOYEE,
          payload: res.data,
        });
      })
      .catch((err: axios.AxiosError) => {
        console.error(err);

        dispatch({
          type: APP_ACTIONS.ADD_NOTIFICATION,
          payload: { status: err.response.status, message: err.response.statusText },
        });

        return err;
      });
  };

export type UpdateObjectiveManager = (objective: IUpdateObjectiveManager) => (dispatch: Dispatch) => void;
export const updateObjectiveManager: UpdateObjectiveManager = (objective: IUpdateObjectiveManager) =>
  (dispatch: Dispatch) => {
    return axiosRequest.patch(`/api/objectives/${objective.id}`, {
      title: objective.title,
      description: objective.description,
    })
      .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
        dispatch({
          type: EMPLOYEES_LIST.UPDATE_OBJECTIVE_MANAGER,
          payload: res.data,
        });
      })
      .catch((err: axios.AxiosError) => {
        console.error(err);

        dispatch({
          type: APP_ACTIONS.ADD_NOTIFICATION,
          payload: { status: err.response.status, message: err.response.statusText },
        });

        return err;
      });
  };

export type ArchiveCareerDay = (careerDay: IArchiveCareerDay) => (dispatch: Dispatch) => void;
export const archiveCareerDay: ArchiveCareerDay = (careerDay: IArchiveCareerDay) => (dispatch: Dispatch) => {
  return axiosRequest.patch(`/api/career-days/archive/${careerDay.id}`, careerDay)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      const newCareerDay: ICareerDayOfEmployee = res.data;

      const newCareerDaysList = store.getState().employees.careerDays.map((item: ICareerDayOfEmployee) => {
        if (item.id === res.data.id) {
          return newCareerDay.id;
        } else {
          return newCareerDay;
        }
      });

      dispatch({ type: EMPLOYEES_LIST.ARCHIVE_CAREER_DAY, payload: { newCareerDaysList, careerDay: res.data } });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: { status: err.response.status, message: err.response.statusText },
      });

      return err;
    });

};

export type UpdateInterviewDate = (datetime: IUpdateInterviewDate) => (dispatch: Dispatch) => void;
export const updateInterviewDate: UpdateInterviewDate = (datetime: IUpdateInterviewDate) => (dispatch: Dispatch) => {
  return axiosRequest.patch(`/api/career-days/update-date/${datetime.id}`, datetime)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      const updatedCareerDay = { ...store.getState().employees.selectedCareerDay };
      updatedCareerDay.InterviewDate = res.data.InterviewDate;

      dispatch({
        type: EMPLOYEES_LIST.UPDATE_INTERVIEW_DATETIME,
        payload: updatedCareerDay,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: { status: err.response.status, message: err.response.statusText },
      });

      return err;
    });
};

export type DeleteObjective = (objectiveId: number) => (dispatch: Dispatch) => void;
export const deleteObjective: DeleteObjective = (objectiveId: number) => (dispatch: Dispatch) => {
  return axiosRequest.delete(`/api/objectives/${objectiveId}`)
    .then(() => {
      const newSelectedCareerDay = { ...store.getState().employees.selectedCareerDay };

      newSelectedCareerDay.Objectives.find((objective: IObjective, index: number): boolean => {
        if (objective.id === objectiveId) {
          newSelectedCareerDay.Objectives.splice(index, 1);

          return true;
        }
        return false;
      });

      dispatch({
        type: EMPLOYEES_LIST.DELETE_OBJECTIVE,
        payload: newSelectedCareerDay,
      });
    })
    .catch((err: axios.AxiosError) => {
      console.error(err);

      dispatch({
        type: APP_ACTIONS.ADD_NOTIFICATION,
        payload: { status: err.response.status, message: err.response.statusText },
      });

      return err;
    });
};
