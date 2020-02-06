import {AXIOS_TIMEOUT, DATA_SOURCES, LANGUAGES, TEST_KEY, WORDS_PER_LESSON} from '../../constants';
import axios from 'axios';
import {strContainSubstr, strEqualSubstr} from '../../functions';

export const ACTIONS = {
    SET_SEARCH_SOURCE: 'SET_SEARCH_SOURCE',
    SEARCH_START: 'SEARCH_START',
    SEARCH_FINISH: 'SEARCH_FINISH',
    SEARCH_ERROR: 'SEARCH_ERROR',
    SEARCH_SUCCESS: 'SEARCH_SUCCESS',
    SEARCH_DB: 'SEARCH_DB',
    SEARCH_SKYENG: 'SEARCH_SKYENG'
};

export const setSearchSource = (skyEng) => ({
    type: ACTIONS.IS_BORMO_CHANGE,
    payload: skyEng
});

export const searchStart = () => ({
    type: ACTIONS.SEARCH_START
});

export const searchFinish = () => ({
    type: ACTIONS.SEARCH_FINISH
});

export const searchSuccess = (payload, storeProperty) => ({
    type: ACTIONS.SEARCH_SUCCESS,
    payload: payload,
    storeProperty: storeProperty
});

export const searchError = (err) => ({
    type: ACTIONS.SET_ERROR_MESSAGE,
    payload: err
});

const getFromJson = async (path, params) => {
    const response = await axios.get(path);
    let result = response ? response.data : [];
    if (params['word']) {
        result = result.filter(el => (params['exact'] ?
            strEqualSubstr(el[LANGUAGES.RU], params['word']) || strEqualSubstr(el[LANGUAGES.EN], params['word']) :
            strContainSubstr(el[LANGUAGES.RU], params['word']) || strContainSubstr(el[LANGUAGES.EN], params['word'])));
    } else {
        result = [];
    }
    return result;
};

const getFromDB = async (apiUrl, params, timeout = AXIOS_TIMEOUT) => {
    const response = await axios.get(apiUrl, {params, timeout});
    return response && response.data['content'] ? response.data['content'] : [];
};

const getFromAPI = async (apiUrl, params, timeout = AXIOS_TIMEOUT) => {
    const response = await axios.get(apiUrl, {params, timeout});
    return response && response.data ? response.data : [];
};

const search = async (dispatch, apiKey, skyEng, searchText, exact) => {
//     const dataPath = skyEng ? SKYENG_URL : DATA_SOURCES[APIkey]['SEARCH'];
//     const params = skyEng ? {search: searchText} : {word: searchText, exact: +exact};
//     const fromJson = (apiKey === TEST_KEY);
//     dispatch(searchStart());
//     try {
//         const result = fromJson ? await getFromJson(dataPath, params) : await getFromDB(dataPath, params, fromJson);
//         dispatch(searchSuccess(result, storeProperty));
//         dispatch(loadingFinish());
//     } catch (err) {
//         dispatch(loadingError(err.message));
//         dispatch(loadingFinish());
//     }
};
