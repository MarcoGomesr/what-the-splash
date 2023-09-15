import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import imagesReducer from './imagesReducer';
import loadingReducer from './loadingReducer';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    images: imagesReducer,
    error: errorReducer,
    nextPage: pageReducer,
});

export default rootReducer;
