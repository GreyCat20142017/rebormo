import {connect} from 'react-redux';
import {coursesLoading, selectCourse} from '../actions/actions';

import Courses from '../../appparts/content/Courses';

const mapStateToProps = (state) => ({
    apiKey: state.data.apiKey,
    courses: state.data.courses,
    currentCourse: state.data.currentCourse,
    error: state.data.error,
    isLoading: state.data.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    onCourseSelect: (id) =>  dispatch(selectCourse(id)),
    onCoursesLoading: (key) => dispatch(coursesLoading(key))
});

const CoursesContainer = connect(mapStateToProps, mapDispatchToProps)(Courses);

export default CoursesContainer;