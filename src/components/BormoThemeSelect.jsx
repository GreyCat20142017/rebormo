import React, {useContext} from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {makeStyles} from '@material-ui/core/styles';
import {ConfigContext} from '../context/config/ConfigContext';

import {themes} from '../theme';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    rootfromConfig: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        '& ::before': {
            borderBottom: '1px solid white'
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    light: {
        color: theme.palette.secondary.main,
        '& *': {
            color: theme.palette.secondary.main,
            border: theme.palette.secondary.main
        }
    },
    dark: {}
}));

const BormoThemeSelect = ({fromConfig = true, light = false}) => {
    const {currentTheme, setTheme} = useContext(ConfigContext);
    const classes = useStyles();


    const onThemeChange = (evt) => {
        const key = evt.target.value;
        if (key) {
            setTheme(key);
        }
    };

    return (
        <FormControl className={classes.formControl}>
            <Select className={light ? classes.light : classes.dark}
                    value={themes[currentTheme]['themeKey']}
                    onChange={onThemeChange}
                    title='Выбор темы интерфейса'>
                {Object.keys(themes).length === 0 ? null : Object.entries(themes).map(([key, el]) =>
                    <MenuItem className={classes.item} value={el.themeKey} key={el.themeKey}
                              title={el.themeDescription}>{el.themeName}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default BormoThemeSelect;
