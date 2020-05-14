import {makeStyles} from '@material-ui/core/styles';

export const useControlModeStyles = makeStyles(theme => ({
    parts: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between'
    },
    part: {
        width: '47.7%'
    },
    cardList: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: '',
        flexWrap: 'wrap',
        width: '100%',
        paddingLeft: '2.2%',
        paddingRight: '2.2%',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        }
    },
    cardItem: {
        minWidth: '100%',
        margin: '4px',
        textAlign: 'center',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            margin: '4px',
            width: '90%'
        }
    },
    card: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            padding: '2px',
            marginTop: '0',
            height: '22px',
            width: '100%'
        }
    },
    title: {
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
            overflow: 'hidden',
            maxWidth: '100%',
            maxHeight: '22px'
        }
    },
    paper: {
        padding: '8px',
        margin: '8px',
        width: '100%',
        alignSelf: 'center'
    },
    colorized: {
        backgroundColor: 'rgb(232, 232, 232)'
    },
    hint: {
        backgroundColor: theme.palette.error.main,
        color: 'white'
    },
    currentWord: {
        width: '80%',
        margin: '20px auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px',
            order: '3',
            height: '22px'
        }
    },
    currentWordContent: {
        fontWeight: 'bold',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            fontWeight: 'normal',
            fontSize: 14,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    },
    currentPaper: {
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 2%',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap'
        }
    },
    badge: {
        padding: `0 ${theme.spacing(1)}px`,
        textTransform: 'uppercase'
    },
    snack: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    }
}));