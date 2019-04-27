import { all } from 'redux-saga/effects'

import {
    watchGetEmployeesList,
    watchGetFreeEmployeesList,
    watchUpdateFreeEmployeesList,
    watchGetActiveCareerDay,
    watchGetSelectedCareerDay,
    watchGetNearestCareerDays
} from './modules/employees/sagas'

export default function* rootSaga() {
    yield all([
        watchGetEmployeesList(),
        watchGetFreeEmployeesList(),
        watchUpdateFreeEmployeesList(),
        watchGetActiveCareerDay(),
        watchGetSelectedCareerDay(),
        watchGetNearestCareerDays(),
    ]);
};
