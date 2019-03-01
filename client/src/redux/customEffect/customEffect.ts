import { fork, take } from 'redux-saga/effects'

export const takeEvery = (patternOrChannel: string, saga: any, ...args: Array<any>) => fork(
  function* () {
    while (true) {
      const action = yield take(patternOrChannel);
      yield fork(saga, ...args.concat(action.payload));
    }
  }
);