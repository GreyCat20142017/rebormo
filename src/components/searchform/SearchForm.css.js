import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    search: {
        width: '100%'
    },
    form: {

    },
    exact: {
        fontSize: '12px',
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '-14px'
        }
    },

}));