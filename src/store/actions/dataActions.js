import axios from 'axios';

import {DATA_SOURCES, WORDS_PER_LESSON, TEST_KEY, AXIOS_TIMEOUT, PHRASES_PER_LESSON} from '../../constants';

export const ACTIONS = {
    IS_BORMO_CHANGE: 'IS_BORMO_CHANGE',
    DATA_SOURCE_SELECT: 'DATA_SOURCE_SELECT',
    COURSES_LOADING: 'COURSES_LOADING',
    COURSES_LOADING_SUCCESS: 'COURSES_LOADING_SUCCESS',
    LESSONS_LOADING: 'LESSONS_LOADING',
    CONTENT_LOADING_SUCCESS: 'CONTENT_LOADING_SUCCESS',
    SELECT_COURSE: 'SELECT_COURSE',
    SELECT_LESSON: 'SELECT_LESSON',
    SELECT_LESSON_PAGE: 'SELECT_LESSON_PAGE',
    PREV_LESSON_PAGE: 'PREV_LESSON_PAGE',
    NEXT_LESSON_PAGE: 'NEXT_LESSON_PAGE',
    SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
    LOADING_START: 'LOADING_START',
    LOADING_FINISH: 'LOADING_FINISH',
    LOADING_ERROR: 'LOADING_ERROR',
    SEARCH_DB_START: 'SEARCH_DB_START',
    SEARCH_DB_SUCCESS: 'SEARCH_DB_SUCCESS',
    SEARCH_SKYENG_START: 'SEARCH_SKYENG_START',
    SEARCH_SKYENG_SUCCESS: 'SEARCH_SKYENG_SUCCESS'
};

export const changeIsBormo = (isBormo) => ({
    type: ACTIONS.IS_BORMO_CHANGE,
    payload: isBormo
});

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

const getFromDB = async (apiUrl, params, timeout= AXIOS_TIMEOUT) => {
    const response = await axios.get(apiUrl, {params, timeout});
    return response && response.data['content'] ? response.data['content'] : [];
};

const getCoursesData = async (dispatch, dataPath, fromJson, storeProperty, params = {}) => {
    dispatch(loadingStart());
    try {
        const result = fromJson ? await getFromJson(dataPath, params) : await getFromDB(dataPath, params, fromJson);
        dispatch(loadingSuccess((
            result
        ), storeProperty));
        dispatch(loadingFinish());
    } catch (err) {
        dispatch(loadingError(err.message));
        dispatch(loadingFinish());
    }
};

const getContentData = async (dispatch, dataPath, fromJson, unitsPerLesson, params = {}) => {
    dispatch(loadingStart());
    try {
        const result = fromJson ? await getFromJson(dataPath, params, unitsPerLesson) : await getFromDB(dataPath, params, fromJson);
        dispatch(loadingSuccess(result, 'content'));
        dispatch(loadingFinish());
    } catch (err) {
        dispatch(loadingError(err.message));
        dispatch(loadingFinish());
    }
};

export const coursesLoading = (key = TEST_KEY, isBormo = true) => {
    const currentType = isBormo ? 'COURSES' : 'SECTIONS';
    const storeProperty = currentType.toLowerCase();
    const dataPath = DATA_SOURCES[key] ? DATA_SOURCES[key][currentType] : DATA_SOURCES.TEST[currentType];
    return dispatch => {
        getCoursesData(dispatch, dataPath, (key === TEST_KEY), storeProperty, {});
    };
};

export const contentLoading = (course, lesson, key = TEST_KEY, isBormo = true) => {
    const contentType = isBormo ? 'CONTENT' : 'PHRASES';
    const params = isBormo ? {course, lesson} : {section: course, lesson};
    const unitsPerLesson = isBormo ? WORDS_PER_LESSON : PHRASES_PER_LESSON;
    const dataPath = DATA_SOURCES[key] ? DATA_SOURCES[key][contentType] : DATA_SOURCES.TEST[contentType];
    return dispatch => {
        getContentData(dispatch, dataPath, (key === TEST_KEY), unitsPerLesson, params);
    };
};

export const loadingStart = () => ({
    type: ACTIONS.LOADING_START
});

export const loadingFinish = () => ({
    type: ACTIONS.LOADING_FINISH
});

export const loadingSuccess = (payload, storeProperty) => ({
    type: ACTIONS.COURSES_LOADING_SUCCESS,
    payload: payload,
    storeProperty: storeProperty
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