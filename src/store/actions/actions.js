import axios from 'axios';

import {DATA_SOURCES, COURSES_PATH, BORMO_PATH, WORDS_PER_LESSON, TEST_KEY} from '../../constants';

export const ACTIONS = {
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
    DATA_SOURCE_SELECT: 'DATA_SOURCE_SELECT',
    SIDENAV_STATE_SWITCH: 'SIDENAV_STATE_SWITCH'
};

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
        timeout: 5000
    });
    return response ? response.data.content : [];
};

const getData = async (dispatch, json, db, params = {}) => {
    dispatch(loadingStart());
    try {
        dispatch(loadingSuccess(await getFromDB(db, params)));
        dispatch(loadingFinish());
    } catch (e) {
        dispatch(changeDataSource(TEST_KEY));
        try {
            dispatch(loadingSuccess(await getFromJson(json, params)));
            dispatch(loadingFinish());
        } catch (err) {
            dispatch(loadingError(e.message + ', ' + err.message));
            dispatch(loadingFinish());
        }
    }
};

export const coursesLoading = (key = DATA_SOURCES.TEST) => {
    const dataPath = DATA_SOURCES[key] ? DATA_SOURCES[key]['COURSES'] : DATA_SOURCES.TEST.COURSES;
    return dispatch => {
        getData(dispatch, COURSES_PATH, dataPath);
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
    type: ACTIONS.COURSES_LOADING_ERROR,
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

export const contentLoading = (course, lesson) => {
    return dispatch => {
        getContentData(dispatch, BORMO_PATH, DATA_SOURCES.PHP_LOCAL.COURSES, {
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

export const loadingContentError = (err) => ({
    type: ACTIONS.CONTENT_LOADING,
    payload: err
});

const getContentData = async (dispatch, json, db, params = {}) => {
    dispatch(loadingContentStart());
    try {
        dispatch(loadingContentSuccess(await getFromDB(db, params)));
        dispatch(loadingContentFinish());
    } catch (e) {
        try {
            dispatch(loadingContentSuccess(await getFromJson(json, params)));
            dispatch(loadingContentFinish());
        } catch (err) {
            dispatch(loadingContentError(e.message + ', ' + err.message));
            dispatch(loadingContentFinish());
        }
    }
};

export const changeDataSource = (key) => ({
    type: ACTIONS.DATA_SOURCE_SELECT,
    payload: key
});

export const switchSidenavState = (sidenavState) => ({
    type: ACTIONS.SIDENAV_STATE_SWITCH,
    payload: sidenavState
});

