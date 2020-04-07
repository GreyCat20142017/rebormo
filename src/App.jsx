import React from 'react';

import {ThemeProvider} from '@material-ui/styles';
import {AppBar, CssBaseline} from '@material-ui/core';

import {theme} from './theme';
import {useStyles} from './App.css';

import FooterContainer from './containers/FooterContainer';
import HeaderContainer from './containers/HeaderContainer';
import BodyContainer from './containers/BodyContainer';
import ContentContainer from './containers/ContentContainer';
import ErrorMessageContainer from './containers/ErrorMessageContainer';
import {VoiceContextProvider} from './context/voice/VoiceContext';
import {UIContextProvider} from './context/ui/UIContext';
import {RebormoContextProvider} from './context/rebormo/RebormoContext';
import {Alert} from './components/alert/Alert';
import {UserContextProvider} from './context/user/UserContext';
import {UserChecker} from './services/UserChecker';

const App = (props) => {
    const classes = useStyles();
    return (
        <VoiceContextProvider>
            <UserContextProvider>
                <UserChecker>
                    <RebormoContextProvider>
                        <UIContextProvider>
                            <ThemeProvider theme={theme}>
                                <CssBaseline/>
                                <div className={classes.app}>
                                    <AppBar position='static'>
                                        <HeaderContainer classes={classes}/>
                                    </AppBar>

                                    <div className={classes.body}>
                                        <BodyContainer classes={classes}/>
                                        <ContentContainer/>
                                        <ErrorMessageContainer/>
                                        <Alert/>
                                    </div>

                                    <AppBar position='static'>
                                        <FooterContainer/>
                                    </AppBar>
                                </div>
                            </ThemeProvider>
                        </UIContextProvider>
                    </RebormoContextProvider>
                </UserChecker>
            </UserContextProvider>
        </VoiceContextProvider>
    );
};

export default App;