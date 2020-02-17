import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(1),
        width: 'auto'
    },
    paperFlex: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        width: 'auto'
    },
}));