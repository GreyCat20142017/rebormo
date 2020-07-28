import {makeStyles} from '@material-ui/core';

export const useStyles = (theme) => makeStyles({
    root: {
        padding: theme.spacing(1),
        maxWidth: '100%'
    },
    tableWrapper: {
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    spaceBetween: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});