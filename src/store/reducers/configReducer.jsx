import {ACTIONS} from '../actions/actions';
import {TEST_KEY} from '../../constants';

export const initialState = {
    APIkey: TEST_KEY
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case ACTIONS.DATA_SOURCE_SELECT:
            return ({...state, APIkey: action.payload});

        default:
            return state;
    }
};

export default reducer;