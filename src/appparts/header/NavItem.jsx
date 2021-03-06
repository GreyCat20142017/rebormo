import React from 'react';
import {NavLink} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import {useStyles} from '../../App.css';
import MUIIcon from '../../components/icon/MUIIcon';
import {DARKPINK_COLOR, PINK_COLOR} from '../../theme';

export const NavItem = ({href, text, icon, exact = false, onLight = false}) => {
    const classes = useStyles();
    const linkClass = onLight ? classes.linkDark : classes.link;
    const activeColor = onLight ? DARKPINK_COLOR : PINK_COLOR;
    return (
        <NavLink className={linkClass} exact={exact} to={href} activeStyle={{color: activeColor}}>
            <Button style={{textTransform: 'none'}} color={'inherit'}>
                <MUIIcon icon={icon}/>
                <span>&nbsp;</span>
                <span>{text}</span>
            </Button>
        </NavLink>
    );
};