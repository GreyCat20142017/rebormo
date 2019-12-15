import {connect} from 'react-redux';
import {
    selectLesson,
    selectLessonPage,
    prevLessonPage,
    nextLessonPage
} from '../actions/actions';

import Lessons from '../../appparts/content/Lessons';

const mapStateToProps = (state) => ({
    apiKey: state.data.apiKey,
    currentCourse: state.data.currentCourse,
    currentLesson: state.data.currentLesson,
    currentPage: state.data.currentPage,
    totalPages: state.data.totalPages,
    lessonsCount: state.data.lessons.length
});

const mapDispatchToProps = (dispatch) => ({
    onLessonSelect: (lesson) => dispatch(selectLesson(lesson)),
    onPageSelect: (page) => {
        dispatch(selectLessonPage(page));
    },
    onPrevPage: () => {
        dispatch(prevLessonPage());
    },
    onNextPage: () => {
        dispatch(nextLessonPage());
    }
});


const LessonsContainer = connect(mapStateToProps, mapDispatchToProps)(Lessons);

export default LessonsContainer;