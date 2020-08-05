import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    configWrapper: {
        margin: '32px auto',
        padding: theme.spacing(1)
    },
    configButton: {
        margin: theme.spacing(1),
    },
    configGroup: {
        margin: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    configPaper: {
        marginBottom: theme.spacing(2)
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(1)
    },
    text: {
        textAlign: 'center',
        paddingBottom: theme.spacing(1),
        paddingTop: 0
    },
    bar: {
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    mtb: {
        // marginTop: theme.spacing(2)
    },
    tabs: {
        marginTop: '50px'
    }
}));