import React from 'react';
import {withRouter} from 'react-router-dom';
import {Typography, Drawer, Paper, Button} from '@material-ui/core';

import {useStyles} from './Help.css';
import {help, about} from '../../info';
import {ROUTES} from '../../routes';


const getTitleByRoute = (path) => (path === ROUTES.help.href ? 'Подсказка' : 'О программе');
const getTextByRoute = (path) => (path === ROUTES.help.href ? help : about);


export const Help = withRouter(({history, location}) => {
    const classes = useStyles();

    const text = getTextByRoute(location.pathname);
    const title = getTitleByRoute(location.pathname);

    const onButtonBackClick = () => (history.goBack());

    return (
        <Drawer className={classes.drawer} open={true}>
            <Paper className={classes.paper}>
                <Typography classname={classes.header} variant={'h5'}>{title}</Typography>
                <div className={classes.wrapper}>
                    {text.map((row, ind) =>
                        <Typography className={classes.text} key={ind} component={'p'} variant={'body2'}>
                            {row}&nbsp;
                        </Typography>
                    )}
                </div>
                <Button variant={'contained'} color={'primary'} title={'Закрыть режим ' + title}
                        onClick={onButtonBackClick}>
                    Назад
                </Button>
            </Paper>
        </Drawer>
    );
});