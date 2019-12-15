import React, {useState} from 'react';
import classNames from 'classnames';
import {Typography, Badge, Paper, TextField} from '@material-ui/core';
import {Error as ErrorIcon, CheckCircle} from '@material-ui/icons';

import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';
import {BORMO_STATUS, LANGUAGES, TOOLBAR_TYPES} from '../../constants';
import {theme} from '../../theme';
import {useStyles} from './Spelling.css.js';
import SimpleToolbar from '../../components/toolbar/SimpleToolbar';
import {isValidIndex} from '../../functions';

const Spelling = ({content, currentCourse, currentLesson}) => {
    const [okCount, setOkCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [timerStatus, setTimerStatus] = useState(BORMO_STATUS.STARTED);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translate, setTranslate] = useState('');

    const classes = useStyles(theme);
    const currentTranslate = content && isValidIndex(currentIndex, content) ? content[currentIndex][LANGUAGES.RU] : '';

    const onTranslateValidate = () => {
    };
    const onTranslateChange = () => {
    };
    const onSkip = () => {
    };
    const onHint = () => {
    };
    const onRestart = () => {
    };

    return (
        content && content.length > 0 ?
            <>
                <div className={classes.spellingWrapper}>
                    <div>
                        {currentCourse ?
                            <Badge className={classes.badge} color='primary' badgeContent={currentLesson}
                                   title={'Курс: ' + currentCourse['name'] + ', урок: ' + currentLesson}>
                                {currentCourse['name']}
                            </Badge> : null
                        }

                        <Badge className={classes.badge} color='primary' badgeContent={errorCount}
                               title={'Количество ошибок: ' + errorCount}>
                            <ErrorIcon fontSize='large' color='error'/>
                        </Badge>

                        <Badge className={classes.badge} color='primary' badgeContent={okCount}
                               title={'Количество правильно отмеченных: ' + okCount}>
                            <CheckCircle fontSize='large' color='disabled'/>
                        </Badge>

                    </div>

                    <Paper className={classNames(classes.paper, classes.currentPaper, classes.currentWord)}>
                        <Typography component='p' variant='h6' color='inherit' align='center'>
                            {okCount === content.length ?
                                'Урок "' + currentCourse + ' № ' + currentLesson + '" пройден ' + (errorCount > 0 ? '. Число ошибок: ' + errorCount : '...') :
                                currentTranslate}
                        </Typography>
                    </Paper>

                    <form className={classes.form} onSubmit={onTranslateValidate}>
                        {(timerStatus === BORMO_STATUS.STARTED) ?
                            <>
                                <TextField
                                    required
                                    autoFocus={true}
                                    id='translate'
                                    label={translate !== currentTranslate && translate !== '' ? 'Ошибка' : 'Перевод:'}
                                    value={translate}
                                    fullWidth
                                    margin='normal'
                                    onChange={onTranslateChange}
                                />
                                <SimpleToolbar toolbar={TOOLBAR_TYPES.SPELLING_STARTED} className={classes.toolbar}
                                               onSkip={onSkip}
                                               onHint={onHint}/>
                            </>
                            :
                            <SimpleToolbar toolbar={TOOLBAR_TYPES.SPELLING_STOPPED} className={classes.toolbar}
                                           onRestart={onRestart}/>
                        }
                    </form>
                </div>
            </> :
            <ContentMissingMessage/>
    );
};

export default Spelling;