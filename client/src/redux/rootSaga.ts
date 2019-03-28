import { all } from 'redux-saga/effects'

import { 
    watchGetEmployeesList,
    watchGetActiveCareerDay,
    watchGetSelectedCareerDay,
    watchGetCareerDayOfEmployee,
    watchgetSelectedEmployee,
    watchGetNearestCareerDays
 } from './modules/employees/sagas'

export default function* rootSaga() {
    yield all([
        watchGetEmployeesList(),
        watchGetCareerDayOfEmployee(),
        watchGetSelectedCareerDay(),
        watchgetSelectedEmployee(),
        watchGetActiveCareerDay(),
        watchGetNearestCareerDays(),
    ]);
};
