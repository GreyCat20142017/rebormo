import {ACTIONS} from '../actions/searchActions';

export const initialState = {
    searchResult: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTIONS.SELECT_VOICE:
            return state;

        default:
            return state;
    }
};

export default reducer;