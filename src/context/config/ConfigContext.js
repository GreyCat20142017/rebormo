import React, {createContext, useCallback, useReducer} from 'react';

/**
 *  actions & reducers
 */

const ACTIONS = {
    CHANGE_VOICE: 'CHANGE_VOICE:',
    CHANGE_THEME: 'CHANGE_THEME',
    CHANGE_BASE: 'CHANGE_BASE'
};

const initialState = {
    instantStart: true,
    instantNextMode: true,
    countErrorAtPrompt: true,
    keyboardModeByDefault: true,
    currentTheme: 'neutral'
};

const handlers = {
    [ACTIONS.CHANGE_BASE]: (state, {payload}) => ({...state}),
    [ACTIONS.CHANGE_THEME]: (state, {payload}) => ({...state, currentTheme: payload}),
    [ACTIONS.CHANGE_VOICE]: (state, {payload}) => ({...state}),
    DEFAULT: state => state
};

export const configReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};

/**
 *  context & context.provider
 */

export const ConfigContext = createContext(null);

export const ConfigContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(configReducer, initialState);

    const setTheme = useCallback((payload) => dispatch({type: ACTIONS.CHANGE_THEME, payload: payload}), []);

       return (
        <ConfigContext.Provider value={{...state, setTheme}}>
            {children}
        </ConfigContext.Provider>
    )
};
