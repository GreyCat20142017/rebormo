import React, {useContext, useEffect, useState} from 'react';
import {Container, Typography} from '@material-ui/core';
import {Redirect} from 'react-router-dom';

import Loader from '../../components/loader/Loader';
import {useLocalStorage} from '../../hooks/customHooks';
import {UserContext} from '../../context/user/UserContext';
import {AuthForm} from '../../components/auth/AuthForm';
import {AUTH_ROUTES} from '../../routes';
import {
    API_PATH,
    DATA_SOURCE_TOKEN_NAME, LARA_KEY,
    LS_TOKEN,
} from '../../constants';
import {useUser} from '../../hooks/userHooks';
import {RebormoContext} from '../../context/rebormo/RebormoContext';


export const SignIn = (props) => {

    const [{isLoading, response, error}, doFetch] = useUser(API_PATH.LOGIN);
    const [, setToken] = useLocalStorage(LS_TOKEN);
    const [{isLoggedIn}, dispatch] = useContext(UserContext);
    const [old, setOld] = useState('');
    const {apiKey, getData} = useContext(RebormoContext);

    useEffect(() => {
        if (!response) {
            return;
        }
        setToken(response[DATA_SOURCE_TOKEN_NAME]);
        dispatch({type: 'LOGIN', payload: {...response['currentUser']}});
    }, [response, setToken, dispatch]);


    useEffect(() => {
        if (!response || (apiKey!== LARA_KEY)) {
            return;
        }
        getData(apiKey);
    });

    const onLogin = (user) => {
        setOld(user.email);
        doFetch({
            method: 'post',
            params: user
        });
    };

    return (
        <Container maxWidth={'sm'}>
            {isLoggedIn && <Redirect to={AUTH_ROUTES.PROFILE.href}/>}
            {isLoading ?
                <Loader message={'Вход в систему...'}/> :
                <AuthForm isSignUp={false} onSuccess={onLogin} old={old}/>
            }
            {error && <Typography variant={'caption'} color={'error'}>{error}</Typography>}
        </Container>
    );
};