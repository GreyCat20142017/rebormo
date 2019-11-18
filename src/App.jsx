import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {AppBar, Container, Paper} from '@material-ui/core';

import {theme} from './theme';
import {useStyles} from './App.css';

import FooterContainer from './store/containers/FooterContainer';
import HeaderContainer from './store/containers/HeaderContainer';
import MainContainer from './store/containers/MainContainer';
import ContentContainer from './store/containers/ContentContainer';


const App = (props) => {
    const classes = useStyles();
    // const [active, setActive] = useState(window.location.pathname);

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.app}>
                <AppBar position='static'>
                    <HeaderContainer classes={classes}/>
                </AppBar>
                <Paper className={classes.paperMain}>
                    <MainContainer classes={classes}/>
                    <ContentContainer/>
                </Paper>
                <AppBar position='static'>
                    <FooterContainer/>
                </AppBar>
            </Container>
        </ThemeProvider>
    );
};

export default App;