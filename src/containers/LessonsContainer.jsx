import React, {useContext} from 'react';
import Lessons from '../appparts/content/Lessons';
import {RebormoContext} from '../context/rebormo/RebormoContext';
import {UIContext} from '../context/ui/UIContext';

export const LessonsContainer = (props) => {
    const {sidenavHide} = useContext(UIContext);
    const {
        apiKey, currentCourse, currentSection, currentLesson, currentPage, totalPages, lessonsCount, isBormo,
        selectPage, nextPage, prevPage, selectLesson
    } = useContext(RebormoContext);
    const current = isBormo ? currentCourse : currentSection;

    const onLessonSelect = (lesson) => {
        selectLesson(lesson);
        sidenavHide();
    };

    const lessonsProps = {
        apiKey, current, currentLesson, currentPage, totalPages, lessonsCount, isBormo,
        onPageSelect: selectPage, onNextPage: nextPage, onPrevPage: prevPage, onLessonSelect: onLessonSelect
    };
    return <Lessons {...lessonsProps} />;
};

export default LessonsContainer;