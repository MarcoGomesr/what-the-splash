import { all } from 'redux-saga/effects';

import imagesSaga from './imagesSaga';
import statsReducerSaga from './statsSaga';

export default function* rootSaga() {
    yield all([imagesSaga(), statsReducerSaga()]);
}
