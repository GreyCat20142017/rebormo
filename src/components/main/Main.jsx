import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';

import {Drawer} from '@material-ui/core';

import {BORMO_MODES, SWITCHABLE_MODES} from '../../routes';
import NotFound from '../../pages/NotFound';
import Sidenav from '../sidenav/Sidenav';

const Main = ({classes, isSideNavOpen, switchSidenav}) => {
    return (
        <>

            <Drawer open={isSideNavOpen} onClose={() => switchSidenav(false)}>
                <Sidenav classes={classes} switchSidenav={switchSidenav}/>
            </Drawer>

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
        </>
    );
};

export default withRouter(Main);
