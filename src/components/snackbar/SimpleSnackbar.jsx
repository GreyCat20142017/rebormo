import React, {useEffect} from 'react';
import {Snackbar, IconButton, makeStyles} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import {KEY_CODES, SNACK_OPEN_TIME} from '../../constants';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    snack: {
        backgroundColor: theme.palette.error.main,
        padding: theme.spacing(1.5),
        fontWeight: 'bold',
        fontSize: '1.2rem'
    }
}));

const SimpleSnackbar = ({open, message, onSnackClose}) => {
    const classes = useStyles();
    useEffect(() => {
        document.addEventListener('keydown', onKeyPress);
        return () => {
            document.removeEventListener('keydown', onKeyPress);
        };
    });

    const onKeyPress = (evt) => {
        if (evt.keyCode === KEY_CODES.ESC) {
            evt.preventDefault();
            onSnackClose();
        }
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
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
        />
    );
};

export default SimpleSnackbar;