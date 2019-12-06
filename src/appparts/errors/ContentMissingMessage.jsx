import React from 'react';
import {Typography} from '@material-ui/core';
import {Apps} from '@material-ui/icons';

import {useStyles} from '../../App.css';

const ContentMissingMessage = () => {
    const classes = useStyles();
    return (
        <div className={classes.messageeWrapper}>
            <Typography variant='body2' component='p'>Необходимо выбрать курс и урок...</Typography>
            <Typography variant='caption' component='p'>
                Для открытия панели выбора используется этот пункт меню:
            </Typography>
            <Apps/>
        </div>
    );
};

export default ContentMissingMessage;