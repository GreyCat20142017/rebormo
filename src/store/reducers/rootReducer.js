import {combineReducers} from 'redux';

import {default as data} from './dataReducer';
import {default as config} from './configReducer';
import {default as ui} from './uiReducer';
import {default as search} from './searchReducer';

const reducer = combineReducers({
    data,
    config,
    ui,
    search
});

export default reducer;