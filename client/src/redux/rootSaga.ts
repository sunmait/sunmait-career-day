import { all } from 'redux-saga/effects'

import {
    watchGetEmployeesList,
    watchGetActiveCareerDay,
    watchGetSelectedCareerDay,
    watchGetNearestCareerDay
} from './modules/employees/sagas'

export default function* rootSaga() {
    yield all([
        watchGetEmployeesList(),
        watchGetActiveCareerDay(),
        watchGetSelectedCareerDay(),
        watchGetNearestCareerDay(),
    ]);
};
