import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/rootReducer';

import {initialState} from './reducers/dataReducer';
import {REBORMO_LS} from '../constants';

const loadState = () => {
    try {
        const serialisedState = window.localStorage.getItem(REBORMO_LS);
        if (!serialisedState) return null;
        return JSON.parse(serialisedState);
    } catch (err) {
        return initialState;
    }
};

const saveState = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        window.localStorage.setItem(REBORMO_LS, serialisedState);
    } catch (err) {
    }
};

const previousState = loadState();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            previousState
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


store.subscribe(() => {
    saveState(store.getState());
});

export default store;