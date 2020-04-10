import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import {API_PATH, LARA_KEY, LS_TOKEN, LS_TOKEN_EXPIRATION} from '../../constants';
import {useLocalStorage} from '../../hooks/customHooks';
import {useUser} from '../../hooks/userHooks';
import {ROUTES} from '../../routes';
import {UserContext} from '../../context/user/UserContext';
import Loader from '../../components/loader/Loader';
import {RebormoContext} from '../../context/rebormo/RebormoContext';

export const Logout = () => {
    const [redirect, setRedirect] = useState(false);
    const [token, setToken] = useLocalStorage(LS_TOKEN);
    const [, setTokenExpiration] = useLocalStorage(LS_TOKEN_EXPIRATION);
    const [{response, isLoading, error}, doFetch] = useUser(API_PATH.LOGOUT);
    const [, dispatch] = useContext(UserContext);
    const {apiKey, getData} = useContext(RebormoContext);

    useEffect(() => {
        if (token) {
            doFetch({method: 'get'});
        }
    }, [doFetch, token]);

    useEffect(() => {
        if (response) {
            dispatch({type: 'LOGOUT'});
            setRedirect(true);
        }
        return () => {
            if (apiKey === LARA_KEY) {
                getData(apiKey);
            }
        };
    }, [response, token, setToken, setTokenExpiration, dispatch, apiKey, getData]);

    if (redirect) {
        return <Redirect to={ROUTES.main.href}/>;
    }

    return (
        isLoading ?
            <Loader/> :
            <Typography color={'error'}>Не удалось разлогиниться: {error}</Typography>
    );
};