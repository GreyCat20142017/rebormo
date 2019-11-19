import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';

import {Drawer, Paper} from '@material-ui/core';

import {ROUTES} from '../../routes';
import NotFound from '../../pages/NotFound';
import Sidenav from '../sidenav/Sidenav';
import Main from '../../pages/main/Main';
import Bormo from '../../pages/bormo/Bormo';
import Control from '../../pages/bormo/Control';
import Spelling from '../../pages/bormo/Spelling';
import Search from '../../pages/search/Search'
import Phrases from '../../pages/phrases/Phrases';

const Body = ({classes, content, isSideNavOpen, switchSidenav, APIkey}) => {
    return (
        <Paper className={window.location.pathname === ROUTES.main.href ? classes.paperMain : classes.paperWhite}>

            <Drawer open={isSideNavOpen} onClose={() => switchSidenav(false)}>
                <Sidenav classes={classes} switchSidenav={switchSidenav}/>
            </Drawer>

            <Switch>

                <Route exact path={ROUTES.main.href} render={(props) => <Main/>}/>
                <Route path={ROUTES.bormo.href} render={(props) => <Bormo classes={classes} content={content}/>}/>
                <Route path={ROUTES.control.href} render={(props) => <Control mode={ROUTES.control.title}/>}/>
                <Route path={ROUTES.reverse.href} render={(props) => <Control mode={ROUTES.reverse.title}/>}/>
                <Route path={ROUTES.spelling.href} render={(props) => <Spelling/>}/>
                <Route path={ROUTES.check.href} render={(props) => <Control mode={ROUTES.check.title}/>}/>
                <Route path={ROUTES.search.href} render={(props) => <Search APIkey={APIkey}/>}/>
                <Route path={ROUTES.phrases.href} render={(props) => <Phrases APIkey={APIkey}/>}/>
                <Route path={ROUTES.skyeng.href} render={(props) => <Search APIkey={APIkey} onlySkyEng={true}/>}/>

                <NotFound/>
            </Switch>
        </Paper>
    );
};

export default withRouter(Body);
