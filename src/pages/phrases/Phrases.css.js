import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    wordsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        listStyle: 'none',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            marginTop: 0
        }
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    wordButton: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(1)
    },
    budge: {
        padding: '0',
        marginTop: '0'
    },
    typo: {
        '&:first-letter': {
            textTransform: 'capitalize'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem'
        }
    }
}));

