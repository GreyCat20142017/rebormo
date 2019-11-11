import {ACTIONS} from '../actions/actions';
import {PAGE_LIMIT} from '../../constants';

const getLessonsArray = (lastLesson) => {
    let courseLessons = [];
    for (let i = 1; i <= lastLesson; i++) {
        courseLessons.push(i);
    }
    return courseLessons;
};

const getTotalPages = (lastLesson) => (Math.ceil(lastLesson / PAGE_LIMIT));

export const initialState = {
    courses: [
        {id: 1, name: 'abc', lastlesson: 3},
        {id: 2, name: 'test', lastlesson: 10}
    ],
    currentCourse: null,
    lessons: [],
    currentPage: 1,
    totalPages: 1,
    currentLesson: null,
    content: [],
    isLoading: false,
    error: null
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case ACTIONS.SELECT_COURSE: {
            const currentCourse = state.courses.find(course => course.id === action.payload);
            const lessons = currentCourse ? getLessonsArray(currentCourse.lastlesson) : [];
            const totalPages = currentCourse ? getTotalPages(currentCourse.lastlesson) : 1;
            return {...state, currentCourse: parseInt(action.payload), lessons: lessons, currentPage: 1, totalPages: totalPages, currentLesson: null, content: []};
        }

        case ACTIONS.COURSES_LOADING:
            return {...state, isLoading: true};

        case ACTIONS.COURSES_LOADING_START:
            return {...state, isLoading: true};

        case ACTIONS.COURSES_LOADING_FINISH:
            return {...state, isLoading: false};

        case ACTIONS.COURSES_LOADING_SUCCESS:
            return {...state, courses: [...action.payload], currentCourse: null};

        case ACTIONS.COURSES_LOADING_ERROR:
            return {...state, error: action.payload, isLoading: false};

        case ACTIONS.PREV_LESSON_PAGE:
            return state.currentPage > 1 ? {...state, currentPage: state.currentPage -1} : state;

        case ACTIONS.NEXT_LESSON_PAGE:
            return state.currentPage < state.totalPages ? {...state, currentPage: state.currentPage + 1} : state;


        case ACTIONS.SELECT_LESSON:
            return {...state, currentLesson: action.payload};

        case ACTIONS.CONTENT_LOADING:
            return {...state, isLoading: true};

        case ACTIONS.CONTENT_LOADING_START:
            return {...state, isLoading: true};

        case ACTIONS.CONTENT_LOADING_FINISH:
            return {...state, isLoading: false};

        case ACTIONS.CONTENT_LOADING_SUCCESS:
            return {...state, content: [...action.payload]};

        default:
            return state;
    }
};

export default reducer;