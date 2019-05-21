import { all } from 'redux-saga/effects'

import { 
    watchGetEmployeesList,
    watchGetFreeEmployeesList,
    watchUpdateFreeEmployeesList,
    watchGetActiveCareerDay,
    watchGetSelectedCareerDay,
    watchGetCareerDayOfEmployee,
    watchgetSelectedEmployee,
    watchGetNearestCareerDays
 } from './modules/employees/sagas'

export default function* rootSaga() {
    yield all([
        watchGetEmployeesList(),
        watchGetFreeEmployeesList(),
        watchUpdateFreeEmployeesList(),
        watchGetActiveCareerDay(),
        watchGetCareerDayOfEmployee(),
        watchGetSelectedCareerDay(),
        watchgetSelectedEmployee(),
        watchGetActiveCareerDay(),
        watchGetNearestCareerDays(),
    ]);
};
