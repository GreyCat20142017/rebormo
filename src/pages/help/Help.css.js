import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    drawer: {
        '&>*': {
            width: '100%',
            textAlign: 'center'
        }
    },
    paper: {
        padding: theme.spacing(2)
    },
    header: {
        margin: theme.spacing(2)
    },
    text: {
      marginTop: theme.spacing(0.5)
    },
    wrapper: {
        padding: theme.spacing(2)
    }
}));