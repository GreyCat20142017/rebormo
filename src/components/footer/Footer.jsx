import React from 'react';
import DropDown from '../dropdown/DropDownHook';
import {DATA_SOURCES} from '../../constants';
import {getInlineSvg} from '../../sprite';

const Footer = ({APIkey, onDataSourceChange, onCoursesLoading}) => {
    const dataSources = Object.keys(DATA_SOURCES).filter(key => !DATA_SOURCES[key].disabled).map((item, ind) => (
        {
            text: DATA_SOURCES[item]['COMMENT'],
            key: item,
            href: item
        }
    ));

    const onSelectDataSource = (key) => {
        if (key!== APIkey) {
            onDataSourceChange(key);
            onCoursesLoading(key);
        }
    };

    return (
        <div className='container d-flex align-items-center'>
            {APIkey ? <p className='p-0 m-0 ml-2'>{DATA_SOURCES[APIkey]['COMMENT'] || ''}</p> : null}
            <div className='dropup w-responsive'>
                <DropDown data={dataSources} ariaInfo={'dropdown-menu'}
                          togglerText={getInlineSvg('config')} callback={onSelectDataSource}
                          returnKey={true}
                          css={{
                              togglerCss: 'btn btn-sm btn-mdb-color dropdown-toggle p-2 w-auto',
                              linkCss: 'dropdown-item p-2 d-flex align-items-center'
                          }}/>
            </div>
        </div>
    );

};

export default Footer;