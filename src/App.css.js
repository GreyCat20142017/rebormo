import {makeStyles} from '@material-ui/core/styles';
import {MDB_COLOR} from './theme';

export const useStyles = makeStyles(theme => ({
    app: {
        textAlign: 'center',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    paper: {
        padding: theme.spacing(1),
        width: 'auto'
    },
    paperMain: {
        width: '100%',
        flexGrow: 1
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    linkDark: {
        textDecoration: 'none',
        color: MDB_COLOR
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
    }

}));