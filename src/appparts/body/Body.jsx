import React, {useEffect, useRef} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {Drawer, Paper} from '@material-ui/core';

import {Bormo, Control, Search, Spelling, Phrases, Main, NotFound} from '../../pages/pages';
import Sidenav from '../sidenav/Sidenav';
import {CONTROL_MODES} from '../../constants';
import {ROUTES} from '../../routes';
import {getIsBormoByLocation} from '../../functions';

const Body = ({
                  classes, content, currentCourse, currentLesson, isSideNavOpen, switchSidenav, apiKey,
                  history, changeIsBormo
              }) => {

    const unlisten = useRef(null);

    useEffect(() => {
        unlisten.current = history.listen((location) => {
            changeIsBormo(getIsBormoByLocation(location.pathname));
        });

        return () => {
            if (unlisten['current']) {
                unlisten.current();
            }
        };
    }, [changeIsBormo, history]);

    return (
        <Paper className={window.location.pathname === ROUTES.main.href ? classes.paperMain : classes.paperWhite}>

            <Drawer open={isSideNavOpen} onClose={() => switchSidenav(false)}>
                <Sidenav classes={classes} switchSidenav={switchSidenav} apiKey={apiKey}/>
            </Drawer>

            <Switch>

                <Route exact path={ROUTES.main.href} render={(props) => <Main/>}/>

                <Route path={ROUTES.bormo.href} render={(props) => <Bormo classes={classes} content={content}/>}/>

                <Route path={ROUTES.control.href} render={(props) =>
                    <Control controlMode={CONTROL_MODES.CONTROL}
                             originalContent={content}
                             currentCourse={currentCourse} currentLesson={currentLesson}/>}
                />

                <Route path={ROUTES.reverse.href} render={(props) =>
                    <Control controlMode={CONTROL_MODES.REVERSE}
                             originalContent={content}
                             currentCourse={currentCourse}
                             currentLesson={currentLesson}/>}
                />

                <Route path={ROUTES.spelling.href} render={(props) =>
                    <Spelling content={content}
                              currentCourse={currentCourse}
                              currentLesson={currentLesson}/>}
                />

                <Route path={ROUTES.check.href} render={(props) =>
                    <Control controlMode={CONTROL_MODES.MIXED}
                             originalContent={content}
                             currentCourse={currentCourse}
                             currentLesson={currentLesson}/>}
                />

                <Route path={ROUTES.search.href} render={(props) => <Search apiKey={apiKey}/>}/>
                <Route path={ROUTES.phrases.href} render={(props) => <Phrases apiKey={apiKey}/>}/>
                <Route path={ROUTES.skyeng.href} render={(props) => <Search apiKey={apiKey} onlySkyEng={true}/>}/>

                <NotFound/>
            </Switch>
        </Paper>
    );
};

export default withRouter(Body);
