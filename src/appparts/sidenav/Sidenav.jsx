import React from 'react';

import {Fab, Paper} from '@material-ui/core';
import {Close} from '@material-ui/icons';

import CoursesContainer from '../../containers/CoursesContainer';
import LessonsContainer from '../../containers/LessonsContainer';

const Sidenav = ({classes, sidenavSwitch}) => (
    <Paper className={classes.sidenav}>
        <Fab color='secondary' aria-label='close'
            title='Закрыть панель выбора' size={'small'}
            onClick={() => sidenavSwitch(false)}>
            <Close/>
        </Fab>
        <CoursesContainer/>
        <LessonsContainer/>
    </Paper>
);

export default Sidenav;



