import {connect} from 'react-redux';
import {contentLoading} from '../actions/actions';

import Content from '../../appparts/content/Content';

const mapStateToProps = (state) => ({
    apiKey: state.data.apiKey,
    content: state.data.content,
    currentCourse: state.data.currentCourse,
    currentLesson: state.data.currentLesson,
    error: state.data.error,
    isLoading: state.data.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    onContentLoading: (course, lesson, apiKey) => dispatch(contentLoading(course, lesson, apiKey))
});

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;