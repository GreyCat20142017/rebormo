import React from 'react';

import Darken from './Darken';
import CoursesContainer from '../../store/containers/CoursesContainer';
import LessonsContainer from '../../store/containers/LessonsContainer';
import SidenavSwitcher from './SidenavSwitcher';

const Sidenav = (props) => {

    return (
        <Darken {...props} switchMethod='switchSidenav'>
            <nav className={'shadow bg-white p-3 overflow-auto text-center'} style={{width: '270px', height: '100%', zIndex: 101}}>
                <SidenavSwitcher isSidenavOpen={props.isSideNavOpen} switchSidenav={props.switchSidenav}/>
                <CoursesContainer/>
                <LessonsContainer/>
            </nav>
        </Darken>
    );
};

export default Sidenav;



