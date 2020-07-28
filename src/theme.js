import {createMuiTheme} from '@material-ui/core/styles';

import {blueGrey, pink, grey, orange} from '@material-ui/core/colors';

export const MDB_COLOR = '#59698d';
export const PINK_COLOR = pink[100];
export const DARKPINK_COLOR = pink[800];

export const NeutralTheme = createMuiTheme({

    palette: {
        primary: {
            main: MDB_COLOR
        },
        secondary: {
            main: blueGrey[200]
        },
        error: {main: DARKPINK_COLOR},
        contrastThreshold: 3,
        tonalOffset: 0.2
    },

    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Arial',
        'sans-serif'
    ].join(','),
    typography: {
        h1: {
            fontSize: 24,
            color: MDB_COLOR,
            fontWeight: 'bold'
        },
        h2: {
            fontSize: 20,
            color: MDB_COLOR,
            fontWeight: 'bold',
            padding: '0.5em'
        }
    }
});

const GreyTheme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[500],
            light: blueGrey[300],
            dark: blueGrey[900],
            contrastText: 'rgb(255, 255, 255)'
        },
        secondary: {
            main: grey[500],
            dark: grey[700],
            contrastText: 'rgb(0, 0, 0)'
        },
        error: {main: orange[900]}
    }
});

export const themes = {
    'neutral': {
        themeObject: NeutralTheme,
        themeDescription: 'Нейтральная тема',
        themeName: 'Нейтральная',
        themeKey: 'neutral'
    },
    'grey': {
        themeObject: GreyTheme,
        themeDescription: 'Серо-зеленая тема',
        themeName: 'Альтернативная',
        themeKey: 'grey'
    }
};

