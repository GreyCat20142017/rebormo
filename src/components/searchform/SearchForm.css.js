import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    searchForm: {
        width: '100%',
        textAlign: 'left'
    },
    searchButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    }
}));