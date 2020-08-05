import React from 'react';
import {Paper, Typography} from '@material-ui/core';

export const OfflineConfig = () => {
    return (
        <Paper>
            <Typography variant={'caption'}>
                Сохранение в localStorage данных для режима Offline
            </Typography>
        </Paper>
    )
};