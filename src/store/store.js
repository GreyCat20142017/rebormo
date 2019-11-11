import {createStore} from 'redux';

import reducer from './reducers/rootReducer';
import {initialState} from './reducers/rootReducer';

const store = createStore(reducer, initialState);

export default store;