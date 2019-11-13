import React from 'react';

import CoursesContainer from '../store/containers/CoursesContainer';
import LessonsContainer from '../store/containers/LessonsContainer';
import ContentContainer from '../store/containers/ContentContainer';


const Bormo = () => {

    return (

            <div className='row'>
                <div className="col-0 col-md-4">
                    <CoursesContainer/>
                    <LessonsContainer/>
                </div>
                <div className="col-12 col-md-7">
                    <ContentContainer/>
                </div>
            </div>
    );
};

export default Bormo;
