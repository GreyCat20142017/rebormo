import React from 'react';
import {DATA_SOURCES} from '../../constants';
import {Toolbar} from '@material-ui/core';
import Submenu from '../submenu/Submenu';

const Footer = ({APIkey, onDataSourceChange, onCoursesLoading}) => {
    const dataSources = Object.keys(DATA_SOURCES).filter(key => !DATA_SOURCES[key].disabled).map((item, ind) => (
        {
            text: DATA_SOURCES[item]['COMMENT'],
            key: item,
            href: item
        }
    ));

    const onSelectDataSource = (key) => {
        if (key !== APIkey) {
            onDataSourceChange(key);
            onCoursesLoading(key);
        }
    };

    return (
        <Toolbar>
            <Submenu submenuItems={dataSources} withNavLink = {false} callback={onSelectDataSource} switchIcon={'Settings'}/>
            {APIkey ? <p className='p-0 m-0 ml-2'>{DATA_SOURCES[APIkey]['COMMENT'] || ''}</p> : null}
        </Toolbar>
    );

};

export default Footer;