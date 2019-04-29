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
<<<<<<< HEAD
        watchGetFreeEmployeesList(),
        watchUpdateFreeEmployeesList(),
        watchGetActiveCareerDay(),
=======
        watchGetCareerDayOfEmployee(),
>>>>>>> master
        watchGetSelectedCareerDay(),
        watchgetSelectedEmployee(),
        watchGetActiveCareerDay(),
        watchGetNearestCareerDays(),
    ]);
};
