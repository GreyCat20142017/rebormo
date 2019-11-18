import React from 'react';
import {DATA_SOURCES, SUBMENU_CONTENT} from '../../constants';
import {Toolbar} from '@material-ui/core';
import Submenu from '../Submenu';

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
            {APIkey ? <p className='p-0 m-0 ml-2'>{DATA_SOURCES[APIkey]['COMMENT'] || ''}</p> : null}
            <Submenu submenuItems={dataSources} type={SUBMENU_CONTENT.BUTTON} callback={onSelectDataSource} switchIcon={'Settings'}/>
        </Toolbar>
    );

};

export default Footer;