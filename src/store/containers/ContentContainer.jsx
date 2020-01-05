import {connect} from 'react-redux';
import {contentLoading} from '../actions/actions';

import Content from '../../appparts/content/Content';

const mapStateToProps = (state) => ({
    apiKey: state.data.apiKey,
    content: state.data.content,
    currentCourse: state.data.currentCourse,
    currentLesson: state.data.currentLesson,
    error: state.data.error,
    isLoading: state.data.isLoading,
    isBormo: state.data.isBormo
});

const mapDispatchToProps = (dispatch) => ({
    onContentLoading: (course, lesson, apiKey, isBormo) => dispatch(contentLoading(course, lesson, apiKey, isBormo))
});

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;