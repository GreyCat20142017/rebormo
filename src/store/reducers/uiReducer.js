import {ACTIONS} from '../actions/actions';
import {ROUTES} from '../../routes';

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

export const initialState = {
    isSideNavOpen: true,
    isBormo: true,
    menuItems: getNavigationLinks(ROUTES, false),
    submenuItems: getNavigationLinks(ROUTES, true)
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case ACTIONS.SIDENAV_STATE_SWITCH:
            return ({...state, isSideNavOpen: action.payload});

        default:
            return state;
    }
};

export default reducer;