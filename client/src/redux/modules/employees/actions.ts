import * as axios from 'axios';
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
import { addNotification } from '../app/actions';
import sendRequest from '../../../components/helper/authRequest';

export const getEmployeesList = () => (dispatch: Dispatch) => {
  return sendRequest('get', '/api/users/employees')
    .then((res: axios.AxiosResponse<IEmployee[]>) => {
      return dispatch({
        type: EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const getCareerDayOfEmployee = (employeeId: number) => (
  dispatch: Dispatch,
) => {
  return sendRequest('get', `/api/career-days/${employeeId}`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee[]>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_CAREER_DAYS,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const getSelectedCareerDay = (careerDayId: number) => (
  dispatch: Dispatch,
) => {
  return sendRequest('get', `/api/objectives/${careerDayId}`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const getActiveCareerDay = (employeeId: number) => (
  dispatch: Dispatch,
) => {
  return sendRequest('get', `/api/career-days/active-day/${employeeId}`).then(
    (res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY,
        payload: res.data,
      });
    },
  );
};

export const getSelectedEmployee = (employeeId: number) => (
  dispatch: Dispatch,
) => {
  return sendRequest('get', `/api/users/selected-employee/${employeeId}`)
    .then((res: axios.AxiosResponse<IEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const addCareerDay = (careerDay: ICareerDay) => (dispatch: Dispatch) => {
  return sendRequest('post', `/api/career-days`, careerDay)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.ADD_CAREER_DAY,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const addObjective = (objective: IObjectiveById) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  return sendRequest('post', `/api/objectives`, objective)
    .then((res: axios.AxiosResponse<IObjective>) => {
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

      dispatch({
        type: EMPLOYEES_LIST.ADD_OBJECTIVE,
        payload: updatedSelectedCareerDay,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const deleteCareerDay = (careerDayId: number) => (
  dispatch: Dispatch,
) => {
  return sendRequest('delete', `/api/career-days/${careerDayId}`)
    .then(() => {
      dispatch({
        type: EMPLOYEES_LIST.DELETE_CAREER_DAY,
        payload: careerDayId,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const updateObjectiveEmployee = (
  objective: IUpdateObjectiveEmployee,
) => (dispatch: Dispatch) => {
  return sendRequest('patch', `/api/objectives/progress/${objective.id}`, {
    progress: objective.progress,
  })
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      dispatch({
        type: EMPLOYEES_LIST.UPDATE_OBJECTIVE_EMPLOYEE,
        payload: res.data,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const updateObjectiveManager = (objective: IUpdateObjectiveManager) => (
  dispatch: Dispatch,
) => {
  return sendRequest('patch', `/api/objectives/${objective.id}`, {
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
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const archiveCareerDay = (careerDay: IArchiveCareerDay) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  return sendRequest('patch', `/api/career-days/archive/${careerDay.id}`)
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
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

      dispatch({
        type: EMPLOYEES_LIST.ARCHIVE_CAREER_DAY,
        payload: { careerDays: newCareerDaysList, selectedCareerDay: res.data },
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const updateInterviewDate = (datetime: IUpdateInterviewDate) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  return sendRequest(
    'patch',
    `/api/career-days/update-date/${datetime.id}`,
    datetime,
  )
    .then((res: axios.AxiosResponse<ICareerDayOfEmployee>) => {
      const { selectedCareerDay } = getState().employees;
      if (!selectedCareerDay) {
        return;
      }

      const updatedCareerDay = { ...selectedCareerDay };
      updatedCareerDay.InterviewDate = res.data.InterviewDate;
      updatedCareerDay.UpdatedAt = res.data.UpdatedAt;

      dispatch({
        type: EMPLOYEES_LIST.UPDATE_INTERVIEW_DATETIME,
        payload: updatedCareerDay,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};

export const deleteObjective = (objectiveId: number) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  return sendRequest('delete', `/api/objectives/${objectiveId}`)
    .then(() => {
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

      dispatch({
        type: EMPLOYEES_LIST.DELETE_OBJECTIVE,
        payload: newSelectedCareerDay,
      });
    })
    .catch((err: axios.AxiosError) => {
      if (err.response) {
        dispatch(
          addNotification({
            status: err.response.status,
            message: err.response.statusText,
          }),
        );
      }
    });
};
