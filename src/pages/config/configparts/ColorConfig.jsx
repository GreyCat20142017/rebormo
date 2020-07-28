import React from 'react';
import {Typography, Paper} from '@material-ui/core';
import BormoThemeSelect from '../../../components/BormoThemeSelect';

export const ColorConfig = ({classes}) => (
    <>
        <Typography variant='caption' className={classes.configGroup}>Цветовая тема (параметр применяется при
            выборе)</Typography>
        <Paper className={classes.configPaper}>
            <BormoThemeSelect fromConfig={true}/>
        </Paper>
    </>
);
