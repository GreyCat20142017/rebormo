import React from 'react';

import {Card, CardHeader, CardContent, Typography, Avatar} from '@material-ui/core';
import {Headset as HeadsetIcon} from '@material-ui/icons';

import {useStyles} from '../../App.css';

const Main = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader title='Браузерная версия программы - зубрилки' avatar={
                <Avatar aria-label='Recipe' className={classes.avatar} color='primary'>
                    <HeadsetIcon fontSize='default' color='inherit'/>
                </Avatar>}
            />

            <CardContent>
                <Typography variant='h5'>
                    Бормотунчик - 2020 (Rebormo)
                </Typography>
                <Typography variant='caption'>
                    <p>React, React Router, Material-UI</p>
                    <p>Рекомендуемый браузер - Google Chrome</p>
                </Typography>
            </CardContent>
        </Card>
    );
};


export default Main;
