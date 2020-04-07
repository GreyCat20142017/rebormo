import React, {createContext, useReducer} from 'react';
import {initialState, reducer} from './UserReducer';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
};