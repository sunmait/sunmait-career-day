import { all } from 'redux-saga/effects'

import { watchGetEmployeesList, watchGetCareerDayOfEmployee, watchGetSelectedCareerDay, watchgetSelectedEmployee } from './modules/employees/sagas'

export default function* rootSaga() {
    yield all([
        watchGetEmployeesList(),
        watchGetCareerDayOfEmployee(),
        watchGetSelectedCareerDay(),
        watchgetSelectedEmployee(),
    ]);
};
