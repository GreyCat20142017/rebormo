import React from 'react';

import {IconButton, Toolbar, Typography, Divider, Hidden} from '@material-ui/core';

import AppsIcon from '@material-ui/icons/Apps';

import {NavItem} from './NavItem';
import Submenu from '../submenu/Submenu';

const Header = ({classes, menuItems, submenuItems, switchSidenav}) => (

    <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu' onClick={() => switchSidenav(true)}>
            <AppsIcon/>
        </IconButton>
        <Typography variant='h6' className={classes.title} title={'Бормотунчик c Redux (Remake Bormo with Redux)'}>
            Rebormo
        </Typography>
        <Divider className={classes.mLeft}/>
        <Hidden smDown={true}>
            {menuItems.map(link =>
                <NavItem key={link.href} {...link}/>)}
        </Hidden>
        <Hidden smUp={true}>
            <Submenu submenuItems={menuItems} withNavLink={true} switchIcon={'Menu'}/>
        </Hidden>
        {/*Здесь выпадающее меню*/}
        <Submenu submenuItems={submenuItems}/>
    </Toolbar>
);

export default Header;


