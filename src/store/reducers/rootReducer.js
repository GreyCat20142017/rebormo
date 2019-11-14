import {combineReducers} from 'redux';

import {default as common} from './commonReducer';
import {default as config} from './configReducer';
import {default as ui} from './uiReducer';

const reducer = combineReducers({
    common,
    config,
    ui
});

export default reducer;