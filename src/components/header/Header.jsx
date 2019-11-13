import React from 'react';
// import {withRouter} from  'react-router-dom';

import DropDown from '../dropdown/DropDownHook';
import {NavItem} from './NavItem';
import {DROPDOWN_TYPE} from '../../constants';

const Header = (props) => (
    <ul className='list-unstyled container d-flex p-1 align-items-center'>
        {props.menuItems.map(link =>
            <li key={link.href}>
                <NavItem {...link}/>
            </li>)}
        <li>
            <DropDown data={props.submenuItems}
                      ariaInfo={'dropdown menu'}
                      togglerText={'...'}
                      linkType={DROPDOWN_TYPE.NAVLINK}
                      css={{
                          togglerCss: 'btn btn-sm btn-mdb-color dropdown-toggle p-2',
                          linkCss: 'dropdown-item p-2 d-flex align-items-center'
                      }}/>
        </li>
    </ul>
);

// export default withRouter(Header);
export default Header;


