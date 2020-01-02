import React, {useState} from 'react';

import {ThemeProvider} from '@material-ui/styles';
import {AppBar, Container, CssBaseline} from '@material-ui/core';

import {theme} from './theme';
import {useStyles} from './App.css';

import FooterContainer from './store/containers/FooterContainer';
import HeaderContainer from './store/containers/HeaderContainer';
import BodyContainer from './store/containers/BodyContainer';
import ContentContainer from './store/containers/ContentContainer';
import ErrorMessageContainer from './store/containers/ErrorMessageContainer';
import VoiceContext, {getBormoSpeaker} from './VoiceContext';

const App = (props) => {
    const [bormoSpeaker] = useState(getBormoSpeaker());

    const classes = useStyles();

    return (
        <VoiceContext.Provider value={{bormoSpeaker}}>

                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Container className={classes.app}>
                        <AppBar position='static'>
                            <HeaderContainer classes={classes}/>
                        </AppBar>
                        <>
                            <BodyContainer classes={classes}/>
                            <ContentContainer/>
                            <ErrorMessageContainer/>
                        </>
                        <AppBar position='static'>
                            <FooterContainer/>
                        </AppBar>
                    </Container>
                </ThemeProvider>

        </VoiceContext.Provider>
    );
};

export default App;