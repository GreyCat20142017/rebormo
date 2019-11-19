import React from 'react';
import {Paper, Typography} from '@material-ui/core';

const Bormo = ({classes, content}) => {
    return (
        <>
            <Typography variant={'h5'}>Bormo</Typography>
            {content.map((word, ind) =>
                <Paper key={{ind}}>{word.english} {word.russian}</Paper>)
            }
        </>
    )
};

export default Bormo;