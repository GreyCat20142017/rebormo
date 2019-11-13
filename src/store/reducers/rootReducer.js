import {combineReducers} from 'redux';

import {default as common} from './commonReducer';
import {default as config} from './configReducer';

const reducer = combineReducers({
    common,
    config
});

export default reducer;