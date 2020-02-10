import React, {useContext} from 'react';
import {UIContext} from '../context/ui/UIContext';
import Header from '../appparts/header/Header';

const HeaderContainer = ({classes}) => {
    const {sidenavSwitch, menuItems, submenuItems} = useContext(UIContext);
    const headerProps = {sidenavSwitch, menuItems, submenuItems};
    return (
        <Header {...headerProps} classes={classes}/>
    );
};

export default HeaderContainer;