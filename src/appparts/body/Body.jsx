import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {Drawer, Paper} from '@material-ui/core';

import {Bormo, Control, Main, NotFound, Phrases, Search, Spelling} from '../../pages/pages';
import Sidenav from '../sidenav/Sidenav';
import {CONTROL_MODES} from '../../constants';
import {ROUTES} from '../../routes';

const Body = ({
                  classes, originalContent, currentCourse, currentLesson, sidenav, sidenavSwitch, apiKey
              }) => {
    const bormoProps = {originalContent, currentCourse, currentLesson};

    return (
        <Paper className={window.location.pathname === ROUTES.main.href ? classes.paperMain : classes.paperWhite}>
            <Drawer open={sidenav} onClose={() => sidenavSwitch(false)}>
                <Sidenav classes={classes} sidenavSwitch={sidenavSwitch} apiKey={apiKey}/>
            </Drawer>

            <Switch>
                <Route exact path={ROUTES.main.href}
                       render={(props) => <Main/>}/>

                <Route path={ROUTES.bormo.href}
                       render={(props) => <Bormo classes={classes} content={originalContent}/>}/>

                <Route path={ROUTES.control.href}
                       render={(props) => <Control controlMode={CONTROL_MODES.CONTROL} {...bormoProps}/>}/>

                <Route path={ROUTES.reverse.href}
                       render={(props) => <Control controlMode={CONTROL_MODES.REVERSE} {...bormoProps}/>}/>

                <Route path={ROUTES.spelling.href}
                       render={(props) => <Spelling {...bormoProps}/>}/>

                <Route path={ROUTES.check.href}
                       render={(props) => <Control controlMode={CONTROL_MODES.MIXED} {...bormoProps}/>}/>

                <Route path={ROUTES.phrases.href}
                       render={(props) => <Phrases content={originalContent}/>}/>

                <Route path={ROUTES.search.href}
                       render={(props) => <Search apiKey={apiKey}/>}/>

                <Route path={ROUTES.skyeng.href}
                       render={(props) => <Search apiKey={apiKey} onlySkyEng={true}/>}/>

                <NotFound/>
            </Switch>
        </Paper>
    );
};

export default withRouter(Body);
