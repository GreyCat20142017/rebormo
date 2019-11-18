import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import BormoIcon from './BormoIcon';
import {NavItem} from './header/NavItem';

import {useStyles} from '../App.css';
import {SUBMENU_CONTENT} from '../constants';


const SubmenuContent = ({link, type = SUBMENU_CONTENT.NAVLINK, callback = null}) => {
    switch (type) {
        case  SUBMENU_CONTENT.NAVLINK:
            return <NavItem  {...link} onLight={true}/>;
        case  SUBMENU_CONTENT.BUTTON:
            return <Button color={'inherit'} onClick={() => callback(link.key)}>{link.text}</Button>;
        default:
    }
    return null;
};

const Submenu = ({submenuItems = [], type = SUBMENU_CONTENT.NAVLINK, callback = null, switchIcon = 'More'}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button color={'inherit'}
                    aria-controls='submenu' aria-haspopup='true' onClick={handleClick}
                    disabled={submenuItems.length === 0}>
                <BormoIcon icon={switchIcon}/>
            </Button>
            <Menu className={classes.submenu}
                  id='submenu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
            >
                {submenuItems.map((link, ind) =>
                    <MenuItem key={ind} color={'inherit'} onClick={handleClose}>
                        <SubmenuContent link={link} type={type} callback={callback}/>
                    </MenuItem>)}

            </Menu>
        </div>
    );
};

export default Submenu;