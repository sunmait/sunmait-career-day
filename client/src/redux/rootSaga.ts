import { all} from 'redux-saga/effects'

import {watchGetEmployeesList} from './modules/employees/sagas'

export default function* rootSaga() {
    yield all([
        watchGetEmployeesList(),
    ]);
}
