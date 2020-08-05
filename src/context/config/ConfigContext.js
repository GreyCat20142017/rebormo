import React, {createContext, useState, useCallback, useReducer} from 'react';
import {useLs} from '../../hooks/hooks';
import {LS_THEME} from '../../constants';

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
    keyboardModeByDefault: true
};

const handlers = {
    [ACTIONS.CHANGE_BASE]: (state, {payload}) => ({...state}),
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
    const [color, setColor] = useLs(LS_THEME, 'neutral');
    const [state] = useReducer(configReducer, initialState);
    const [currentTheme, setCurrentTheme] = useState(color);

    const setTheme = useCallback(
        (payload) => {
            setCurrentTheme(payload);
            setColor(payload);
        }, [setColor]);

    return (
        <ConfigContext.Provider value={{...state, currentTheme, setTheme}}>
            {children}
        </ConfigContext.Provider>
    )
};
