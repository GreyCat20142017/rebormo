import {connect} from 'react-redux';
import {
    selectLesson,
    selectLessonPage,
    prevLessonPage,
    nextLessonPage
} from '../actions/actions';

import Lessons from '../../components/Lessons';

const mapStateToProps = (state) => ({
    currentCourse: state.common.currentCourse,
    currentPage: state.common.currentPage,
    totalPages: state.common.totalPages,
    lessonsCount: state.common.lessons.length
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