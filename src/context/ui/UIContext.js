import React, {createContext, useState} from 'react';
import {ROUTES} from '../../routes';

export const UIContext = createContext(null);

const getNavigationLinks = (routes, submenu = true) => (
    Object.keys(routes).filter(route => (routes[route]['submenu'] || false) === submenu).map(route => {
        return ({
            'href': routes[route]['href'] || route,
            'text': routes[route]['title'] || route,
            'icon': routes[route]['icon'] || '',
            'exact': routes[route]['exact'] || false
        });
    })
);

const menuItems = getNavigationLinks(ROUTES, false);
const submenuItems = getNavigationLinks(ROUTES, true);

export const UIContextProvider = ({children}) => {
    const [message, setMessage] = useState(null);
    const [sidenav, setSidenav] = useState(false);

    const messageHide = () => setMessage(null);
    const messageShow = (msg) => setMessage(msg);


    const sidenavHide = () => setSidenav(false);
    const sidenavShow = () => setSidenav(true);
    const sidenavSwitch = () => setSidenav(!sidenav);

    return (
        <UIContext.Provider value={{
            message, messageShow, messageHide,
            sidenav, sidenavShow, sidenavHide, sidenavSwitch,
            menuItems, submenuItems
        }}>
            {children}
        </UIContext.Provider>
    );
};
