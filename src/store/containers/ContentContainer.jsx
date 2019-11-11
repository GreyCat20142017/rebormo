import {connect} from 'react-redux';
import {contentLoading} from '../actions/actions';

import Content from '../../components/Content';

const mapStateToProps = (state) => ({
    content: state.common.content,
    currentCourse: state.common.currentCourse,
    currentLesson: state.common.currentLesson,
    error: state.common.error,
    isLoading: state.common.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    onContentLoading: (course, lesson) => dispatch(contentLoading(course, lesson))
});

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;