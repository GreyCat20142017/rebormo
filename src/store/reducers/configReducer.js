import {ACTIONS} from '../actions/configActions';

export const initialState = {
    voice: ''
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