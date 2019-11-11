import {combineReducers} from 'redux';

import { default  as  common} from './commonReducer';

const reducer = combineReducers({
    common
});

export default reducer;


