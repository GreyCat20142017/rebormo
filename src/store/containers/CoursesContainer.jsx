import {connect} from 'react-redux';
import {coursesLoading, selectCourse} from '../actions/actions';

import Courses from '../../components/Courses';

const mapStateToProps = (state) => ({
    courses: state.common.courses,
    currentCourse: state.common.currentCourse,
    error: state.common.error,
    isLoading: state.common.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    onCourseSelect: (id) =>  dispatch(selectCourse(id)),
    onCoursesLoading: () => dispatch(coursesLoading())
});

const CoursesContainer = connect(mapStateToProps, mapDispatchToProps)(Courses);

export default CoursesContainer;