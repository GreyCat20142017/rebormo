import React from 'react';
import Courses from '../appparts/content/Courses';
import {useContext} from 'react';
import {RebormoContext} from '../context/rebormo/RebormoContext';

const CoursesContainer =  () => {
    const {isLoading, error, apiKey, isBormo, courses, sections,
        currentCourse, currentSection, selectCurrent} =  useContext(RebormoContext);
    const items = isBormo ? courses : sections;
    const current = isBormo ? currentCourse : currentSection;
    const  coursesProps = {isLoading, error, items, current, apiKey, isBormo};

    return (
        <Courses {...coursesProps} onCourseSelect={selectCurrent} />
    )
};

export default CoursesContainer;