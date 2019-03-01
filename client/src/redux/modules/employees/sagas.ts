import { fork, take, put } from 'redux-saga/effects'

import EMPLOYEES_LIST from './actionConstants';
import sendRequestHelper from '../../../components/helper/API/sendRequestHelper';
import { IEmployee, ICareerDayOfEmployee } from '../employees/reducer';
import { IUserProfile } from '../oidc/reducer'
import {
    getEmployeesListSuccess,
    getActiveCareerDaySuccess,
    getSelectedCareerDaySuccess
} from './actions'

const takeEvery = (patternOrChannel: string, saga: any, ...args: Array<any>) => fork(
    function* () {
        while (true) {
            const action = yield take(patternOrChannel);
            yield fork(saga, ...args.concat(action.payload));
        }
    }
);

export function* watchGetEmployeesList() {
    yield takeEvery(EMPLOYEES_LIST.GET_EMPLOYEES_LIST,
        getEmployeesList);
}

function* getEmployeesList() {
    const res = yield sendRequestHelper.get<IEmployee[]>('/api/users/employees');
    yield put(getEmployeesListSuccess(res.data));
};

export function* watchGetActiveCareerDay() {
    yield takeEvery(EMPLOYEES_LIST.GET_ACTIVE_CAREER_DAY,
        getActiveCareerDay);
}

function* getActiveCareerDay(employeeId: IEmployee['id']) {
    const res = yield sendRequestHelper.get<ICareerDayOfEmployee>(
        `/api/career-days/active-day/${employeeId}`,
    );
    const managerResponse = yield sendRequestHelper.get<IUserProfile>(
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
    const res = yield sendRequestHelper.get<ICareerDayOfEmployee>(
        `/api/objectives/${careerDayId}`,
    );
    const managerResponse = yield sendRequestHelper.get<IUserProfile>(
        `/api/users/selected-employee/${res.data.UnitManagerId}`);
    res.data.ManagerFirstName = managerResponse.data.FirstName;
    res.data.ManagerLastName = managerResponse.data.LastName;

    yield put(getSelectedCareerDaySuccess(res.data));
};