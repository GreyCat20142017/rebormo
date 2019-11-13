import React from 'react';
import {NavLink} from 'react-router-dom';

import {getInlineSvg} from '../../sprite';

export const NavItem = ({href, text, icon, exact = false}) => (
    <NavLink className={'btn btn-sm btn-mdb-color p-2 d-flex align-items-center'} exact={exact} to={href}
             activeClassName={'btn-light-green'}>
        <span>{getInlineSvg(icon)}</span>
        <span>&nbsp;&nbsp;</span>
        <span>{text}</span>
    </NavLink>
);