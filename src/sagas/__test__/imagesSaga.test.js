import { runSaga } from 'redux-saga';
import { setError, setImages } from '../../actions';
import * as api from '../../api';
import { getPage, handleImagesLoad } from '../imagesSaga';

it('selector gives back the page', () => {
    const nextPage = 1;
    const state = { nextPage };
    const res = getPage(state);
    expect(res).toBe(nextPage);
});

it('should load images and handle them in case of success', async () => {
    //dispatch actions
    const dispatchedActions = [];

    const mockedImages = ['abc', 'ddd'];
    api.fetchImages = jest.fn(() => Promise.resolve(mockedImages)); //mutates the api

    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleImagesLoad).done;
    // console.log(dispatchedActions);

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setImages(mockedImages));
});

it('handle errors in case of fail', async () => {
    //dispatch actions
    const dispatchedActions = [];

    //error message
    //mock api call
    const error = 'API server is down';
    api.fetchImages = jest.fn(() => Promise.reject(error)); //mutates the api

    //fake store
    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action),
    };

    //trigger fake store
    await runSaga(fakeStore, handleImagesLoad).done;

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
});
