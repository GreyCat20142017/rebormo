import React, {useContext} from 'react';
import {IconButton, makeStyles, Snackbar} from '@material-ui/core';
import {Close} from '@material-ui/icons';

import {UIContext} from '../../context/ui/UIContext';
import {KEY_CODES, SNACK_OPEN_TIME} from '../../constants';
import {useKeyPress} from '../../hooks/hooks';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5)
    },
    snack: {
        backgroundColor: theme.palette.error.main,
        padding: theme.spacing(1.5),
        fontWeight: 'bold',
        fontSize: '1.2rem'
    }
}));

export const Alert = () => {
    const {message, messageHide, alertTime} = useContext(UIContext);
    const classes = useStyles();
    useKeyPress(KEY_CODES.ESC, messageHide);

    if (!message) return null;

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            open={!!(message)}
            autoHideDuration={alertTime || SNACK_OPEN_TIME}
            onClose={messageHide}
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
                    onClick={messageHide}>
                    <Close/>
                </IconButton>]}
        />
    );
};