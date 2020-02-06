import {ACTIONS} from '../actions/searchActions';

export const initialState = {
    skyEng: false,
    onlySkyEng: false,
    exact: false,
    searchResult: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTIONS.SET_SEARCH_SOURCE:
            return {...state, skyEng: action.payload};

        default:
            return state;
    }
};

export default reducer;