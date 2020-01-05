import {connect} from 'react-redux';
import {coursesLoading, selectCourse} from '../actions/actions';

import Courses from '../../appparts/content/Courses';

const mapStateToProps = (state) => {
       return ({
    apiKey: state.data.apiKey,
    courses: state.data.isBormo ? state.data.courses : state.data.sections,
    sections: state.data.sections,
    currentCourse: state.data.currentCourse,
    error: state.data.error,
    isLoading: state.data.isLoading,
    isBormo : state.data.isBormo
})};

const mapDispatchToProps = (dispatch) => ({
    onCourseSelect: (id) =>  {dispatch(selectCourse(id))},
    onCoursesLoading: (key) => {
        dispatch(coursesLoading(key, true));
        dispatch(coursesLoading(key, false));
    }
});

const CoursesContainer = connect(mapStateToProps, mapDispatchToProps)(Courses);

export default CoursesContainer;