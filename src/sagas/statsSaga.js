import { call, fork, put, take } from 'redux-saga/effects';
import { IMAGES } from '../constants';

import { loadImageStats, setImageStats, setImageStatsError } from '../actions';
import { fetchImageStats } from '../api';

export function* handleStatsRequest(id) {
    for (let i = 0; i < 3; i++) {
        try {
            yield put(loadImageStats(id));
            const res = yield call(fetchImageStats, id);
            yield put(setImageStats(id, res.downloads.total));
            // image was loaded so we exit the generator
            return true;
        } catch (error) {
            // we just need to retry and dispactch an error
            // if we tried more than 3 times
        }
    }
    yield put(setImageStatsError(id));
}

export default function* watchStatsRequest() {
    while (true) {
        //we ge the action here
        const { images } = yield take(IMAGES.LOAD_SUCCESS);

        for (let i = 0; i < images.length; i++) {
            yield fork(handleStatsRequest, images[i].id);
        }
    }
}
