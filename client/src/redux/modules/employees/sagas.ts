import { put, call } from 'redux-saga/effects'
import { takeEvery } from '../../customEffect/customEffect'
import EMPLOYEES_LIST from './actionConstants';
import sendRequestHelper from '../../../components/helper/API/sendRequestHelper';
import { IEmployee, ICareerDayOfEmployee } from '../employees/reducer';

import {
<<<<<<< HEAD
    getEmployeesListSuccess,
    getFreeEmployeesListSuccess,
    updateFreeEmployeesListSuccess,
    getActiveCareerDaySuccess,
    getSelectedCareerDaySuccess,
=======
  loadSelectedCareerDay,
  loadCarreerDayForEmployee,
  loadEmployeesList,
  getEmployeesListSuccess,
  getActiveCareerDaySuccess,
  getSelectedCareerDaySuccess,
  getCareerDayOfEmployeeSuccess,
  getSelectedEmployeeSuccess,
>>>>>>> master
    getNearestCareerDaysSuccess,
} from './actions'


export function* watchGetEmployeesList() {
    yield takeEvery(EMPLOYEES_LIST.GET_EMPLOYEES_LIST, getEmployeesList);
}

function* getEmployeesList() {
  yield put(loadEmployeesList(true));
  const res = yield call(sendRequestHelper.get, '/api/users/employees');
  yield put(getEmployeesListSuccess(res.data));
  yield put(loadEmployeesList(false));
};

export function* watchGetFreeEmployeesList() {
    yield takeEvery(EMPLOYEES_LIST.GET_FREE_EMPLOYEES_LIST, getFreeEmployeesList);
}

function* getFreeEmployeesList() {
    const res = yield call(sendRequestHelper.get, '/api/users/manageEmployees/');
    yield put(getFreeEmployeesListSuccess(res.data));
};

export function* watchUpdateFreeEmployeesList() {
    yield takeEvery(EMPLOYEES_LIST.UPDATE_FREE_EMPLOYEES_LIST, updateFreeEmployeesList);
}

function* updateFreeEmployeesList(id: string) {
    const res = yield call(sendRequestHelper.get, `/api/users/updateManageEmployees/${id}`);
    yield put(updateFreeEmployeesListSuccess(res.data));
};

export function* watchGetActiveCareerDay() {
  yield takeEvery(EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY,
    getActiveCareerDay);
}

export function* watchGetCareerDayOfEmployee() {
  yield takeEvery(EMPLOYEES_LIST.GET_CAREER_DAYS, getCareerDayOfEmployee);
}

function* getCareerDayOfEmployee(employeeId: IEmployee) {
  yield put(loadCarreerDayForEmployee(true));
  const res = yield sendRequestHelper.get<ICareerDayOfEmployee[]>(`/api/career-days/${employeeId}`);
  yield put(getCareerDayOfEmployeeSuccess(res.data));
  yield put(loadCarreerDayForEmployee(false));
}

export function* watchgetSelectedEmployee() {
  yield takeEvery(EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE, getSelectedEmployee);
}

function* getSelectedEmployee(employeeId: IEmployee['id']) {
  const res = yield sendRequestHelper.get<IEmployee>(`/api/users/selected-employee/${employeeId}`);
  yield put(getSelectedEmployeeSuccess(res.data));
}

function* getActiveCareerDay(employeeId: IEmployee['id']) {
  const res = yield call(sendRequestHelper.get,
    `/api/career-days/active-day/${employeeId}`);
  const managerResponse = yield call(sendRequestHelper.get,
    `api/users/selected-employee/${res.data.UnitManagerId}`);
  res.data.ManagerFirstName = managerResponse.data.FirstName;
  res.data.ManagerLastName = managerResponse.data.LastName;
  yield put(getActiveCareerDaySuccess(res.data));
};

export function* watchGetSelectedCareerDay() {
  yield takeEvery(EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY,
    getSelectedCareerDay);
}

function* getSelectedCareerDay(careerDayId: ICareerDayOfEmployee['id']) {
  yield put(loadSelectedCareerDay(true));
  const res = yield call(sendRequestHelper.get,
    `/api/objectives/${careerDayId}`);
  const managerResponse = yield call(sendRequestHelper.get,
    `/api/users/selected-employee/${res.data.UnitManagerId}`);
  res.data.ManagerFirstName = managerResponse.data.FirstName;
  res.data.ManagerLastName = managerResponse.data.LastName;
  yield put(getSelectedCareerDaySuccess(res.data));
  yield put(loadSelectedCareerDay(false));
};

export function* watchGetNearestCareerDays() {
    yield takeEvery(EMPLOYEES_LIST.GET_NEAREST_CAREER_DAYS,
        getNearestCareerDays)
}

function* getNearestCareerDays() {
    const res = yield call(sendRequestHelper.get,
        `/api/career-days/nearest-career-days`);

    yield put(getNearestCareerDaysSuccess(res.data));
}
