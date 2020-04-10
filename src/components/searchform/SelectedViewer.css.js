import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflow: 'auto',
    },
    joinedPanel: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        border: '1px solid rgb(211, 211, 211)',
        display: 'flex'
    },
    comment: {
        display: 'flex'
    }
}));