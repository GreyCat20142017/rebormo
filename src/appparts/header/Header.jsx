import React from 'react';

import {IconButton, Toolbar, Typography, Divider, Hidden} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';

import {NavItem} from './NavItem';
import Submenu from '../../components/submenu/Submenu';
import {UserMenu} from '../../components/usermenu/UserMenu';

const Header = ({classes, menuItems, submenuItems, sidenavSwitch}) => (

    <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu' onClick={() => sidenavSwitch(true)}>
            <AppsIcon/>
        </IconButton>
        <Hidden>
            <Typography variant='h6' className={classes.title} title={'Бормотунчик (Remake Bormo)'}>
                Rebormo
            </Typography>
        </Hidden>
        <Divider className={classes.mLeft}/>
        <Hidden smDown={true}>
            {menuItems.map(link =>
                <NavItem key={link.href} {...link}/>)}
        </Hidden>
        <Hidden smUp={true}>
            <Submenu submenuItems={menuItems} withNavLink={true} switchIcon={'Menu'}/>
        </Hidden>
        {/*Здесь выпадающее меню*/}
        <UserMenu/>
        <Submenu submenuItems={submenuItems}/>

    </Toolbar>
);

export default Header;


