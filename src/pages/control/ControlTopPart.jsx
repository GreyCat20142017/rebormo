import React from 'react';
import classNames from 'classnames';

import {Badge, Paper, Typography} from '@material-ui/core';
import {Error as ErrorIcon, CheckCircle} from '@material-ui/icons';

const CurrentBudge = ({classes, currentCourse, currentLesson}) => (
    currentCourse ? <Badge className={classes.badge} color="primary" badgeContent={currentLesson}
                           title={'Курс: ' + currentCourse.name + ', урок: ' + currentLesson}>
        {currentCourse.name}
    </Badge> : null
);

export const ControlTopPart = ({classes, content, currentCourse, currentLesson, okCount, errorCount, currentTranslate, isHint = false}) => (
    <div className={classes.wrapper}>
        <CurrentBudge classes={classes} currentCourse={currentCourse} currentLesson={currentLesson}/>

        <Paper
            className={classNames(classes.paper, classes.currentPaper, classes.currentWord, isHint ? classes.hint : '')}>
            <Typography className={classNames(classes.currentWordContent)}
                        component='p' variant='h6' color='inherit' align='center'
                        title={okCount === content.length ? 'Alt+N-ext, Alt+P-revious, Alt+R-estart' : currentTranslate}>
                {okCount === content.length ?
                    'Урок "' + currentCourse['name'] + ' № ' + currentLesson + '" пройден. Число ошибок: ' + errorCount :
                    currentTranslate}
            </Typography>
        </Paper>

        <Badge className={classes.badge} color='primary' badgeContent={errorCount}
               title={'Количество ошибок: ' + errorCount}>
            <ErrorIcon fontSize='large' color='error'/>
        </Badge>

        <Badge className={classes.badge} color='primary' badgeContent={okCount}
               title={'Количество правильно отмеченных: ' + okCount}>
            <CheckCircle fontSize='large' color='disabled'/>
        </Badge>

    </div>
);