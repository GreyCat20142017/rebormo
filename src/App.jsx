import React, {useContext} from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {AppBar, CssBaseline, useTheme} from '@material-ui/core';

import FooterContainer from './containers/FooterContainer';
import HeaderContainer from './containers/HeaderContainer';
import BodyContainer from './containers/BodyContainer';
import ErrorMessageContainer from './containers/ErrorMessageContainer';
import {Alert} from './components/alert/Alert';

import {VoiceContextProvider} from './context/voice/VoiceContext';
import {UIContextProvider} from './context/ui/UIContext';
import {RebormoContextProvider} from './context/rebormo/RebormoContext';
import {ConfigContextProvider, ConfigContext} from './context/config/ConfigContext';
import {UserContextProvider} from './context/user/UserContext';
import {UserChecker} from './services/UserChecker';

import {NeutralTheme, themes} from './theme';
import {useStyles} from './App.css';


const StyledApp = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return <div className={classes.app}>
        <AppBar position='static'>
            <HeaderContainer classes={classes}/>
        </AppBar>
        <div className={classes.body}>
            <BodyContainer classes={classes}/>
            <ErrorMessageContainer/>
            <Alert/>
        </div>
        <AppBar position='static'>
            <FooterContainer/>
        </AppBar>
    </div>;
}

const AppContent = () => {
    const {currentTheme} = useContext(ConfigContext);
    const appTheme = currentTheme && themes[currentTheme] ? themes[currentTheme]['themeObject'] : NeutralTheme;

    return (
        <UIContextProvider>
            <ThemeProvider theme={appTheme}>
                <CssBaseline/>
                <StyledApp/>
            </ThemeProvider>
        </UIContextProvider>
    )
}

const App = (props) => {
    return (
        <ConfigContextProvider>
            <VoiceContextProvider>
                <UserContextProvider>
                    <UserChecker>
                        <RebormoContextProvider>
                            <AppContent/>
                        </RebormoContextProvider>
                    </UserChecker>
                </UserContextProvider>
            </VoiceContextProvider>
        </ConfigContextProvider>
    )
};

export default App;