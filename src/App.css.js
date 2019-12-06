import {makeStyles} from '@material-ui/core/styles';
import {theme} from './theme';

const mainColor = theme.palette.primary.main;

export const useStyles = makeStyles(theme => ({
    app: {
        textAlign: 'center',
        padding: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(1),
        width: 'auto'
    },
    paperMain: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: mainColor,
        backgroundOrigin: 'content-box',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        display: 'flex',
        justifyContent: 'center'
    },
    paperWhite: {
        width: '100%',
        flexGrow: 1,
        padding: '20px'
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    linkDark: {
        textDecoration: 'none',
        color: mainColor
    },
    mLeft: {
        marginLeft: 'auto'
    },
    sidenav: {
        width: '270px',
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    submenu: {
        display: 'flex',
        flexDirection: 'column'
    },
    courses: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1),
        marginTop: theme.spacing(2)
    },
    courseBtn: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    lessonBtn: {
        margin: theme.spacing(1)
    },
    card: {
        alignSelf: 'center',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        maxWidth: '400px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '250px'
        }
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    },
    wrapper: {
        width: '100%',
        flexGrow: 1
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    paperFlex: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        width: 'auto'
    },
    messageWrapper: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2
    }
}));

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
        justifyContent: 'space-between',
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
        padding: theme.spacing.unit,
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
        padding: `0 ${theme.spacing.unit}px`,
        textTransform: 'uppercase'
    },
    snack: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    }
}));

