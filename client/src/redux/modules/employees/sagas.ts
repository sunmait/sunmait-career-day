import { put, call } from 'redux-saga/effects'
import { takeEvery } from '../../customEffect/customEffect'
import EMPLOYEES_LIST from './actionConstants';
import sendRequestHelper from '../../../components/helper/API/sendRequestHelper';
import { IEmployee, ICareerDayOfEmployee } from '../employees/reducer';
import {
    getEmployeesListSuccess,
    getActiveCareerDaySuccess,
    getSelectedCareerDaySuccess
} from './actions'

export function* watchGetEmployeesList() {
  yield takeEvery(EMPLOYEES_LIST.GET_EMPLOYEES_LIST, getEmployeesList);
}

function* getEmployeesList() {
    const res = yield call(sendRequestHelper.get,'/api/users/employees');
    yield put(getEmployeesListSuccess(res.data));
};

export function* watchGetActiveCareerDay() {
    yield takeEvery(EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY,
        getActiveCareerDay);
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
    const res = yield call(sendRequestHelper.get,
        `/api/objectives/${careerDayId}`);

    const managerResponse = yield call(sendRequestHelper.get,
        `/api/users/selected-employee/${res.data.UnitManagerId}`);
    res.data.ManagerFirstName = managerResponse.data.FirstName;
    res.data.ManagerLastName = managerResponse.data.LastName;

    yield put(getSelectedCareerDaySuccess(res.data));
};
