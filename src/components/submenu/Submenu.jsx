import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import BormoIcon from '../icon/BormoIcon';

import {useStyles} from '../../App.css';
import {NavLink} from 'react-router-dom';
import {MenuItem} from '@material-ui/core';
import {DARKPINK_COLOR, PINK_COLOR} from '../../theme';

const Submenu = ({submenuItems = [], withNavLink = true, onLight = true, callback = null, switchIcon = 'More'}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const linkClass = onLight ? classes.linkDark : classes.link;
    const activeColor = onLight ? DARKPINK_COLOR : PINK_COLOR;

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (key) => {
        setAnchorEl(null);
        if (callback && key) {
            callback(key);
        }
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
                    (withNavLink ?
                            <NavLink className={linkClass} key={ind} exact={link.exact} to={link.href} activeStyle={{color: activeColor}}>
                                <MenuItem key={ind} title={link.text} onClick={() => handleClose(link.key)}>
                                    <BormoIcon icon={link.icon}/>
                                    <span>&nbsp;</span>
                                    <span>{link.text}</span>
                                </MenuItem>
                            </NavLink> :
                            <MenuItem key={ind} title={link.text} onClick={() => handleClose(link.key)}>
                                <BormoIcon icon={link.icon}/>
                                <span>&nbsp;</span>
                                <span>{link.text}</span>
                            </MenuItem>
                    ))}

            </Menu>
        </div>
    );
};

export default Submenu;