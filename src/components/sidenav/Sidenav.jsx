import React from 'react';

import {Fab, Paper} from '@material-ui/core';
import {Close} from '@material-ui/icons';

import CoursesContainer from '../../store/containers/CoursesContainer';
import LessonsContainer from '../../store/containers/LessonsContainer';

const Sidenav = ({classes, switchSidenav}) => (
    <Paper className={classes.sidenav}>
        <Fab color='inherit' aria-label='close'
            title='Закрыть панель выбора' size={'small'}
            onClick={() => switchSidenav(false)}>
            <Close/>
        </Fab>
        <CoursesContainer/>
        <LessonsContainer/>
    </Paper>
);

export default Sidenav;



