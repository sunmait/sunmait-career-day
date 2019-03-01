import { takeEvery, put } from 'redux-saga/effects';

import EMPLOYEES_LIST from './actionConstants';
import sendRequestHelper from '../../../components/helper/API/sendRequestHelper';
import { IEmployee, ICareerDayOfEmployee } from '../employees/reducer';
import { getEmployeesListSuccess, getCareerDayOfEmployeeSuccess, getSelectedCareerDaySuccess, getSelectedEmployeeSuccess, getCareerDayOfEmployee as getCareerDayOfEmployeeAction } from './actions';

export function* watchGetEmployeesList() {
  yield takeEvery(EMPLOYEES_LIST.GET_EMPLOYEES_LIST, getEmployeesList);
}

function* getEmployeesList() {
  const res = yield sendRequestHelper.get<IEmployee[]>('/api/users/employees');
  yield put(getEmployeesListSuccess(res.data));
}

export function* watchGetCareerDayOfEmployee() {
  yield takeEvery(EMPLOYEES_LIST.GET_CAREER_DAYS, getCareerDayOfEmployee);
}

function* getCareerDayOfEmployee(employeeId: ReturnType<typeof getCareerDayOfEmployeeAction>) {
  console.log(employeeId.payload);
  const res = yield sendRequestHelper.get<ICareerDayOfEmployee[]>(`/api/career-days/${employeeId.payload}`);
  yield put(getCareerDayOfEmployeeSuccess(res.data))
}

export function* watchGetSelectedCareerDay() {
  yield takeEvery(EMPLOYEES_LIST.GET_SELECTED_CAREER_DAY, getSelectedCareerDay);
}

function* getSelectedCareerDay(careerDayId: ICareerDayOfEmployee['id']) {
  const res = yield sendRequestHelper.get<ICareerDayOfEmployee>(`/api/objectives/${careerDayId}`);
  yield put(getSelectedCareerDaySuccess(res.data))
}

export function* watchgetSelectedEmployee() {
  yield takeEvery(EMPLOYEES_LIST.GET_SELECTED_EMPLOYEE, getSelectedEmployee);
}

function* getSelectedEmployee(employeeId: IEmployee['id']) {
  const res = yield sendRequestHelper.get<IEmployee>(`/api/users/selected-employee/${employeeId}`);
  yield put(getSelectedEmployeeSuccess(res.data));
}