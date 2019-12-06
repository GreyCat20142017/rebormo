import React from 'react';
import {IconButton, Paper, Typography} from '@material-ui/core';
import {Done, Pause, PlayArrow, Stop} from '@material-ui/icons';

import {BORMO_STATUS} from '../../constants';

const getCurrentMessage = (currentCourse, currentLesson, currentIndex, maxIndex) => (
    currentCourse && currentLesson ?
        currentCourse.toUpperCase() + ', урок ' + currentLesson + ' (' +
        (currentIndex + 1) + ' из ' + (maxIndex) + ')' :
        ''
);

export const BormoCurrentWord = ({classes, currentWord, currentTranslate, activeAmount = 0}) => (
    <div className={classes.currentWord}>
        <Paper className={classes.paper}>
            <Typography component='p' variant='h5' color='inherit'>
                {activeAmount === 0 ? 'Все слова этого урока отмечены как изученные...' : currentWord}
            </Typography>
        </Paper>
        <Paper className={classes.paper}>
            <Typography component='p' variant='h5' color='inherit'>
                {activeAmount === 0 ? 'Можно выбрать другой урок или повторить этот.' : currentTranslate}
            </Typography>
        </Paper>
    </div>
);

export const BormoControls = ({
                                  classes, timerStatus, timerStart, timerStop, timerPause,
                                  currentCourse, currentLesson, currentIndex, maxIndex,
                                  onDebouncedSwitchCurrent
                              }) => (
    <>
        <div className={classes.controls}>
            <IconButton aria-label='Старт' className={classes.margin} onClick={timerStart} title="Старт">
                <PlayArrow/>
            </IconButton>
            <IconButton aria-label='Пауза' className={classes.margin} onClick={timerPause} title="Пауза"
            >
                <Pause/>
            </IconButton>
            <IconButton aria-label='Стоп' className={classes.margin} onClick={timerStop} title="Стоп">
                <Stop/>
            </IconButton>
            {timerStatus === BORMO_STATUS.STARTED ?
                <IconButton aria-label='Отметить' className={classes.margin} onClick={onDebouncedSwitchCurrent}
                            data-done="true" title="Отметить слово как изученное" autoFocus={true}>
                    <Done/>
                </IconButton>
                : null
            }
        </div>
        <Typography component='p' variant='body2'>
            {getCurrentMessage(currentCourse, currentLesson, currentIndex, maxIndex)}
        </Typography>

        <Typography component='p' variant='caption'>
            SPACE - отметить текущее слово как изученное
        </Typography>
    </>
);