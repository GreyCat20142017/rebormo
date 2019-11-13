import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Header from './components/header/Header';
import FooterContainer from './store/containers/FooterContainer';
import {ROUTES, SWITCHABLE_MODES, BORMO_MODES} from './routes';
// import Bormo from './pages/Bormo';
import NotFound from './pages/NotFound';

const getNavigationLinks = (routes, submenu = true) => (
    Object.keys(routes).filter(route => (routes[route]['submenu'] || false) === submenu).map(route => {
        console.log(route, routes[route]);
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


const App = (props) => (
    <div className='bg-white min-vh-100 d-flex flex-column'>
        <nav className='mdb-color lighten-1 text-white'>
            <Header menuItems={menuItems} submenuItems={submenuItems}/>
        </nav>
        <div className='flex-grow-1 overflow-auto p-2'>

            <Switch>

                {SWITCHABLE_MODES.map((route, ind) => (
                    <Route key={ind + '-s'} exact path={route.href} render={(props) =>
                        <p>{route.title}</p>
                    }/>
                ))}

                {BORMO_MODES.map((route, ind) => (
                    <Route key={ind + '-b'} path={route.href}
                           render={props => <p>{route.title}</p>}/>))
                }

                <NotFound/>
            </Switch>
        </div>
        <div className='mdb-color lighten-1 text-white'>
            <FooterContainer/>
        </div>
    </div>
);

export default withRouter(App);