import axios from 'axios';

import {DATA_SOURCES, WORDS_PER_LESSON, TEST_KEY, AXIOS_TIMEOUT} from '../../constants';

export const ACTIONS = {
    DATA_SOURCE_SELECT: 'DATA_SOURCE_SELECT',
    COURSES_LOADING: 'COURSES_LOADING',
    COURSES_LOADING_START: 'COURSES_LOADING_START',
    COURSES_LOADING_FINISH: 'COURSES_LOADING_FINISH',
    COURSES_LOADING_SUCCESS: 'COURSES_LOADING_SUCCESS',
    COURSES_LOADING_ERROR: 'COURSES_LOADING_ERROR',
    SELECT_COURSE: 'SELECT_COURSE',
    LESSONS_LOADING: 'LESSONS_LOADING',
    SELECT_LESSON_PAGE: 'SELECT_LESSON_PAGE',
    PREV_LESSON_PAGE: 'PREV_LESSON_PAGE',
    NEXT_LESSON_PAGE: 'NEXT_LESSON_PAGE',
    SELECT_LESSON: 'SELECT_LESSON',
    CONTENT_LOADING: 'CONTENT_LOADING',
    CONTENT_LOADING_START: 'CONTENT_LOADING_START',
    CONTENT_LOADING_FINISH: 'CONTENT_LOADING_FINISH',
    CONTENT_LOADING_SUCCESS: 'CONTENT_LOADING_SUCCESS',
    CONTENT_LOADING_ERROR: 'CONTENT_LOADING_ERROR',
    SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE'
};

export const changeDataSource = (key) => ({
    type: ACTIONS.DATA_SOURCE_SELECT,
    payload: key
});

const getFromJson = async (path, params, unitsPerLesson = WORDS_PER_LESSON) => {
    const response = await axios.get(path);
    let result = response ? response.data : [];
    if (params['lesson']) {
        result = result.filter((el, ind) => {
            const startInd = (parseInt(params['lesson'], 10) - 1) * unitsPerLesson || 0;
            return (ind >= startInd && ind < (startInd + unitsPerLesson));
        });
    }
    return result;
};

const getFromDB = async (apiUrl, params) => {
    const response = await axios.get(apiUrl, {
        params: params,
        timeout: AXIOS_TIMEOUT
    });
    return response && response.data['content'] ? response.data['content'] : [];
};

const getCoursesData = async (dispatch, dataPath, fromJson, params = {}) => {
    dispatch(loadingStart());
    try {
        dispatch(loadingSuccess((
            fromJson ?
                await getFromJson(dataPath, params) :
                await getFromDB(dataPath, params, fromJson)
        )));
        dispatch(loadingFinish());
    } catch (err) {
        dispatch(loadingError(err.message));
        dispatch(loadingFinish());
    }
};

export const coursesLoading = (key = TEST_KEY) => {
    const dataPath = DATA_SOURCES[key] ? DATA_SOURCES[key]['COURSES'] : DATA_SOURCES.TEST.COURSES;
    return dispatch => {
        getCoursesData(dispatch, dataPath, (key === TEST_KEY), {});
    };
};

export const loadingStart = () => ({
    type: ACTIONS.COURSES_LOADING_START
});

export const loadingFinish = () => ({
    type: ACTIONS.COURSES_LOADING_FINISH
});

export const loadingSuccess = (payload) => ({
    type: ACTIONS.COURSES_LOADING_SUCCESS,
    payload: payload
});

export const loadingError = (err) => ({
    type: ACTIONS.SET_ERROR_MESSAGE,
    payload: err
});

export const selectCourse = (id) => ({
    type: ACTIONS.SELECT_COURSE,
    payload: id
});

export const selectLesson = (lesson) => ({
    type: ACTIONS.SELECT_LESSON,
    payload: lesson
});

export const selectLessonPage = (page) => ({
    type: ACTIONS.SELECT_LESSON_PAGE,
    payload: page
});

export const prevLessonPage = () => ({
    type: ACTIONS.PREV_LESSON_PAGE,
});

export const nextLessonPage = () => ({
    type: ACTIONS.NEXT_LESSON_PAGE,
});

export const contentLoading = (course, lesson, key = TEST_KEY) => {
    const dataPath = DATA_SOURCES[key] ? DATA_SOURCES[key]['CONTENT'] : DATA_SOURCES.TEST.CONTENT;
    return dispatch => {
        getContentData(dispatch, dataPath, (key === TEST_KEY), {
            course,
            lesson
        });
    };
};

export const loadingContentStart = () => ({
    type: ACTIONS.CONTENT_LOADING_START
});

export const loadingContentFinish = () => ({
    type: ACTIONS.CONTENT_LOADING_FINISH
});

export const loadingContentSuccess = (payload) => ({
    type: ACTIONS.CONTENT_LOADING_SUCCESS,
    payload: payload
});

const getContentData = async (dispatch, dataPath, fromJson, params = {}) => {
    dispatch(loadingContentStart());
    try {
        dispatch(loadingContentSuccess((
            fromJson ?
                await getFromJson(dataPath, params) :
                await getFromDB(dataPath, params, fromJson)
        )));
        dispatch(loadingContentFinish());
    } catch (err) {
        dispatch(loadingError(err.message));
        dispatch(loadingContentFinish());
    }
};
