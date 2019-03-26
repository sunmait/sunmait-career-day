import { all } from 'redux-saga/effects'
import { 
    watchGetEmployeesList,
    watchGetActiveCareerDay,
    watchGetSelectedCareerDay,
    watchGetCareerDayOfEmployee,
    watchgetSelectedEmployee
 } from './modules/employees/sagas'

export default function* rootSaga() {
    yield all([
        watchGetEmployeesList(),
        watchGetCareerDayOfEmployee(),
        watchGetSelectedCareerDay(),
        watchgetSelectedEmployee(),
        watchGetActiveCareerDay(),
    ]);
};
