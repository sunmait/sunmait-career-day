import { takeEvery, put } from 'redux-saga/effects'

import EMPLOYEES_LIST from './actionConstants';
import sendRequestHelper from '../../../components/helper/API/sendRequestHelper';
import { IEmployee } from '../employees/reducer';
import { getEmployeesListSucces } from './actions'

export function* watchGetEmployeesList() {
    yield takeEvery(EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
        getEmployeesList);
}

function* getEmployeesList() {
    const res = yield sendRequestHelper.get<IEmployee[]>('/api/users/employees');
    yield put(getEmployeesListSucces(res.data));
}