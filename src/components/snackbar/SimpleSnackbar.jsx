import React from 'react';
import {Snackbar, IconButton, makeStyles} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import {amber} from '@material-ui/core/colors';
import {SNACK_OPEN_TIME} from '../../constants';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    snack: {
        backgroundColor: amber[700]
    }
}));

const SimpleSnackbar = ({open, message, onSnackClose}) => {
    const classes = useStyles();
    return (<Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        open={open}
        autoHideDuration={SNACK_OPEN_TIME}
        onClose={onSnackClose}
        ContentProps={{
            'aria-describedby': 'message-id',
            'className': classes.snack
        }}
        message={message}
        action={[
            <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={onSnackClose}
            >
                <Close/>
            </IconButton>,
        ]}
    />);
};

export default SimpleSnackbar;