import React, {createContext, useCallback, useEffect, useReducer} from 'react';

import {
    getCurrentType, getCurrentUrl, getRefinedResponse, getSelectedCourse, getToken, getTotalPages,
    getUrlForLoggedUser, isLara
} from '../../functions';
import {ROUTES} from '../../routes';
import {LARA_KEY, TEST_KEY} from '../../constants';
import {getHeaders} from '../../hooks/userHooks';
import {useFetch} from '../../hooks/hooks';

const getLessonCount = (state) => (
    state.isBormo ?
        (state['currentCourse'] ? state['currentCourse']['lastlesson'] : 0) :
        (state['currentSection'] ? state['currentSection']['lastlesson'] : 0)
);

/**
 *  actions & reducers
 */

const ACTIONS = {
    CHANGE_IS_BORMO: 'CHANGE_IS_BORMO:',
    CHANGE_API: 'CHANGE_API',
    COURSES: 'COURSES',
    SECTIONS: 'SECTIONS',
    CONTENT: 'CONTENT',
    SELECT_CURRENT: 'SELECT_CURRENT',
    SELECT_LESSON: 'SELECT_LESSON',
    PREV_LESSON: 'PREV_LESSON',
    NEXT_LESSON: 'NEXT_LESSON',
    SELECT_PAGE: 'SELECT_PAGE',
    PREV_PAGE: 'PREV_PAGE',
    NEXT_PAGE: 'NEXT_PAGE',
    SET_ERROR: 'SET_ERROR',
    DESELECT: 'DESELECT'
};

const initialState = {
    isBormo: (window.location.pathname !== ROUTES.phrases.href),
    apiKey: LARA_KEY,
    courses: [],
    sections: [],
    currentCourse: null,
    currentSection: null,
    content: [],
    currentLesson: null,
    currentPage: 1,
    totalPages: 1,
    lessonsCount: 0,
    error: null
};

const currentCourseReducer = (state, payload) => {

    const propertyCourses = state.isBormo ? 'currentCourse' : 'currentSection';
    const selectedCourse = getSelectedCourse(state.isBormo ? state.courses : state.sections, payload);
    let totalPages = 1;
    let lessonsCount = 0;
    if (selectedCourse) {
        lessonsCount = parseInt(selectedCourse['lastlesson']);
        totalPages = getTotalPages(lessonsCount);
    }
    return ({
        ...state, [propertyCourses]: selectedCourse, totalPages, lessonsCount, currentPage: 1, currentLesson: null
    });
};

const handlers = {
    [ACTIONS.COURSES]: (state, {payload}) => ({...state, courses: payload}),
    [ACTIONS.SECTIONS]: (state, {payload}) => ({...state, sections: payload}),
    [ACTIONS.SELECT_CURRENT]: (state, {payload}) => currentCourseReducer(state, payload),
    [ACTIONS.SELECT_PAGE]: (state, {payload}) => ({...state, currentPage: payload}),
    [ACTIONS.PREV_PAGE]: (state) => (
        state.currentPage > 1 ? {...state, currentPage: state.currentPage - 1} : state),
    [ACTIONS.NEXT_PAGE]: (state) => (
        state.currentPage < state.totalPages ? {...state, currentPage: state.currentPage + 1} : state),
    [ACTIONS.SELECT_LESSON]: (state, {payload}) => ({...state, currentLesson: payload}),
    [ACTIONS.PREV_LESSON]: (state) =>
        (state.currentLesson > 1 ? {...state, currentLesson: state.currentLesson - 1} : state),
    [ACTIONS.NEXT_LESSON]: (state) => (
        state.currentLesson < state.lessonsCount ? {...state, currentLesson: state.currentLesson + 1} : state),
    [ACTIONS.CONTENT]: (state, {payload}) => ({...state, content: payload}),
    [ACTIONS.SET_ERROR]: (state, {payload}) => ({...state, error: payload}),
    [ACTIONS.CHANGE_IS_BORMO]: (state, {payload}) => ({...state, isBormo: payload}),
    [ACTIONS.CHANGE_API]: (state, {payload}) => (
        {...initialState, apiKey: payload, content: null, currentLesson: null, currentCourse: null}
    ),
    [ACTIONS.DESELECT]: (state) => ({
        ...state,
        content: [],
        currentLesson: null,
        currentPage: 1,
        totalPages: 1,
        lessonsCount: getLessonCount(state)
    }),
    DEFAULT: state => state
};

export const rebormoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};

/**
 *  context & context.provider
 */

export const RebormoContext = createContext(null);

export const RebormoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(rebormoReducer, initialState);
    const [{isLoading: coursesIsLoading, response: coursesResponse, error: coursesError}, {doFetch: fetchCourses}] = useFetch();
    const [{isLoading: sectionsIsLoading, response: sectionsResponse, error: sectionsError}, {doFetch: fetchSections}] = useFetch();
    const [{isLoading: contentIsLoading, response: contentResponse, error: contentError}, {doFetch: fetchContent}] = useFetch();
    const currentKey = state.apiKey;


    useEffect(() => {
        dispatch({type: ACTIONS.CHANGE_IS_BORMO, payload: (window.location.pathname !== ROUTES.phrases.href)});
    }, []);

    const getContent = (path, params) => {
        const key = state.apiKey;
        const currentType = getCurrentType(key, path);
        const url = getCurrentUrl(key, currentType);
        fetchContent({
            method: 'get',
            url: url,
            params: params
        });
    };

    const getData = useCallback((key = TEST_KEY) => {
        const getCourses = (url, params) => {
            fetchCourses({method: 'get', url: url, ...params});
        };

        const getSections = (url, params) => {
            fetchSections({method: 'get', url: url, ...params});
        };

        const types = ['COURSES', 'SECTIONS'];
        types.forEach((currentType => {
            const token = getToken();
            const params = token && isLara(key) ? {headers: getHeaders(token)} : {};
            const url = token && isLara(key) ? getUrlForLoggedUser(currentType) : getCurrentUrl(key, currentType);
            if (currentType === 'COURSES') {
                getCourses(url, params);
            } else {
                getSections(url, params);
            }
        }));
    }, [fetchCourses, fetchSections]);

    useEffect(() => {
        if (!coursesResponse) {
            return;
        }
        dispatch({type: ACTIONS.COURSES, payload: coursesResponse});
    }, [coursesResponse]);

    useEffect(() => {
        if (!sectionsResponse) {
            return;
        }
        dispatch({type: ACTIONS.SECTIONS, payload: sectionsResponse});
    }, [sectionsResponse]);

    useEffect(() => {
        if (!contentResponse) {
            return;
        }
        dispatch({
            type: ACTIONS.CONTENT,
            payload: getRefinedResponse(contentResponse, state.apiKey, state.currentLesson, state.isBormo)
        });
    }, [contentResponse, state.apiKey, state.currentLesson, state.isBormo]);

    useEffect(() => {
        const err = (coursesError || sectionsError || contentError);
        if (err) {
            dispatch({type: ACTIONS.SET_ERROR, payload: 'Ошибка при получении данных ' + err});
        }
    }, [coursesError, sectionsError, contentError]);

    useEffect(() => {
        if (currentKey) {
            getData(currentKey)
        }
    }, [currentKey, getData]);

    const deselect = useCallback(() => {
        dispatch({type: ACTIONS.DESELECT});
    }, []);


    const changeIsBormo = (bormoState) => (dispatch({type: ACTIONS.CHANGE_IS_BORMO, payload: bormoState}));
    const selectCurrent = (id) => (dispatch({type: ACTIONS.SELECT_CURRENT, payload: id}));
    const selectPage = (page) => (dispatch({type: ACTIONS.SELECT_PAGE, payload: page}));
    const prevPage = () => (dispatch({type: ACTIONS.PREV_PAGE}));
    const nextPage = () => (dispatch({type: ACTIONS.NEXT_PAGE}));

    const selectLesson = (lesson) => {
        const path = state.isBormo ? 'courses' : 'sections';
        const paramName = state.isBormo ? 'course' : 'section';
        const propertyName = state.isBormo ? 'currentCourse' : 'currentSection';

        if (state[propertyName] && lesson) {
            getContent(path, {[paramName]: state[propertyName]['id'], lesson: parseInt(lesson)});
        }
        dispatch({type: ACTIONS.SELECT_LESSON, payload: parseInt(lesson)});
    };

    const prevLesson = () => {
        const changedLesson = state.currentLesson > 1 ? state.currentLesson - 1 : state.currentLesson;
        selectLesson(changedLesson);
    };

    const nextLesson = () => {
        const changedLesson = state.currentLesson < state.lessonsCount ? state.currentLesson + 1 : state.currentLesson;
        selectLesson(changedLesson);
    };

    const clearError = () => dispatch({type: ACTIONS.SET_ERROR, payload: null});

    const changeDataSource = useCallback((key) => {
        dispatch({type: ACTIONS.CHANGE_API, payload: key});
        getData(key);
    }, [getData]);

    const {
        apiKey, isBormo, courses, sections, currentCourse, currentSection, content, error,
        currentPage, totalPages, lessonsCount, currentLesson
    } = state;
    const isLoading = (coursesIsLoading || sectionsIsLoading || contentIsLoading);


    return (
        <RebormoContext.Provider value={{
            apiKey, isBormo, courses, sections, isLoading, error, currentCourse, currentSection,
            currentLesson, content, deselect,
            currentPage, totalPages, lessonsCount, changeIsBormo, clearError, changeDataSource, getData,
            selectCurrent, selectLesson, selectPage, nextPage, prevPage, prevLesson, nextLesson
        }}>
            {children}
        </RebormoContext.Provider>
    )
};
