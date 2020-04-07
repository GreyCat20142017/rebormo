import {useCallback, useContext, useEffect} from 'react';

import {UserContext} from '../context/user/UserContext';
import {useLocalStorage} from '../hooks/customHooks';
import {API_PATH, LS_TOKEN, LS_TOKEN_EXPIRATION} from '../constants';
import {useUser} from '../hooks/userHooks';

export const UserChecker = ({children}) => {
    const [, dispatch] = useContext(UserContext);
    const [{response: getProfileResponse, error: getProfileError}, doGetProfile] = useUser(API_PATH.GET_USER);
    const [tokenExpirationDate, setTokenExpirationDate] = useLocalStorage(LS_TOKEN_EXPIRATION);
    const [token, setToken] = useLocalStorage(LS_TOKEN);

    const tokenLogout = useCallback(() => {
        setToken('');
        setTokenExpirationDate('');
        dispatch({type: 'LOGOUT'});
    }, [dispatch, setToken, setTokenExpirationDate]);

    useEffect(() => {
        if (!token || (token && (new Date(tokenExpirationDate) <= Date.now()))) {
            tokenLogout();
            return;
        }
        doGetProfile({
            method: 'get',
        });
        dispatch({type: 'LOADING'});
    }, [dispatch,  doGetProfile, token, tokenExpirationDate, tokenLogout]);

    useEffect(() => {
        if (!getProfileResponse) {
            return;
        }
        dispatch({type: 'LOGIN', payload: getProfileResponse});
    }, [getProfileResponse, dispatch]);

    useEffect(() => {
        if (!getProfileError) {
            return;
        }
        dispatch({type: 'ERROR', payload: getProfileError});
    }, [getProfileError, dispatch]);

    return children;
};

