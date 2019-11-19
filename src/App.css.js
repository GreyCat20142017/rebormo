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
        // margin: '20vh auto',
        alignSelf: 'center',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        maxWidth: '400px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '250px'
        },

    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    },

    wrapper: {
        width: '100%',
        flexGrow: 1
    }

}));