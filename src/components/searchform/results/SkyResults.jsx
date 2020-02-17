import React from 'react';
import classNames from 'classnames';
import {ButtonBase, Paper, Typography} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import SkyResultTabs from './SkyResultTabs';
import SkyengData from '../../../classes/SkyengData';
import {useStyles} from './SkyResults.css';

const audio = new Audio();

const playSound = (url) => {
    if (url) {
        try {
            audio.src = url;
            audio.play();
        } catch (e) {
        }
    }
};

const SkyResults = ({data}) => {
    const classes = useStyles();
    const sky = data ? new SkyengData(data) : null;

    return (
        sky && sky.status ?
            <div className={classes.form}>
                <Paper className={classNames(classes.paperFlex, classes.paper)}>
                    <Typography variant='h6'> Слово: {sky.basicInfo.text} [ {sky.basicInfo.transcription} ]</Typography>
                    <ButtonBase className={classes.simpleButton}
                                onClick={() => playSound(sky.basicInfo.soundUrl)}>
                        <VolumeUpIcon/>
                    </ButtonBase>
                </Paper>
                <Paper className={classes.paper}>
                    <SkyResultTabs classes={classes} skyData={sky}/>
                </Paper>
            </div>
            :
            null
    );
};

export default SkyResults;
