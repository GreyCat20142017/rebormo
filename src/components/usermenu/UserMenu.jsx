import React, {useState, useContext, useEffect} from 'react';
import {Chip} from '@material-ui/core';

import Submenu from '../submenu/Submenu';
import MUIIcon from '../icon/MUIIcon';
import {RebormoContext} from '../../context/rebormo/RebormoContext';
import {UserContext} from '../../context/user/UserContext';
import {isLara} from '../../functions';
import {AUTH_ROUTES, HIDE_WHEN} from '../../routes';

const NONAME = 'Аноним';

export const getUserInfo = (user, apiKey) => {
    let result = 'Вход не выполнен';
    if (isLara(apiKey) && user) {
        result = user['name'] ? user['name'] : `${NONAME} ${user['email'] || ''}`;
    }
    return result;
};

const getMenuByRoutes = (userSubmenu = false, isLoggedIn = false) => (
    Object.keys(AUTH_ROUTES).filter(key => (!!(AUTH_ROUTES[key]['userSubmenu']) === userSubmenu &&
        AUTH_ROUTES[key]['hide'] !== (isLoggedIn ? HIDE_WHEN.AUTH : HIDE_WHEN.NOT_AUTH))).map(key =>
        ({
            ...AUTH_ROUTES[key],
            href: AUTH_ROUTES[key].href,
            text: AUTH_ROUTES[key]['title'] || AUTH_ROUTES[key]['label'],
            key: AUTH_ROUTES[key].href
        }))
);

export const UserMenu = () => {
    const [{currentUser, isLoggedIn}] = useContext(UserContext);
    const {apiKey} = useContext(RebormoContext);
    const [userMenu, setUserMenu] = useState([]);

    useEffect(() => {
        const items = isLara(apiKey) ? getMenuByRoutes(true, isLoggedIn) : [];
        setUserMenu(items);
    }, [isLoggedIn, apiKey]);


    return (
        <div style={{marginLeft: 'auto'}}>
            <Submenu submenuItems={userMenu} switchIcon={'User'}/>
            <Chip variant={'outlined'} style={{color: 'white'}}
                  avatar={isLoggedIn && isLara(apiKey)? <MUIIcon icon={'LoggedUser'}/> : null}
                  label={getUserInfo(currentUser, apiKey)}/>
        </div>
    )
};