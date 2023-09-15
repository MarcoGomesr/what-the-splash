import { IMAGES } from '../constants';

const imagesReducr = (state = [], action) => {
    if (action.type === IMAGES.LOAD_SUCCESS) {
        return [...state, action.images];
    }
    return state;
};

export default imagesReducr;
