import { all } from 'redux-saga/effects'

import {
    watchGetEmployeesList,
    watchGetActiveCareerDay,
    watchGetSelectedCareerDay,
    watchGetNearestCareerDays
} from './modules/employees/sagas'

export default function* rootSaga() {
    yield all([
        watchGetEmployeesList(),
        watchGetActiveCareerDay(),
        watchGetSelectedCareerDay(),
        watchGetNearestCareerDays(),
    ]);
};
