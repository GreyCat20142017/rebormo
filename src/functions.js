import {
    BORMO_STATUS,
    CONTROL_MODES,
    LANGUAGES,
    FIELDS,
    PAGE_LIMIT,
    TEST_KEY,
    PHRASES_PER_LESSON,
    WORDS_PER_LESSON, DATA_SOURCES
} from './constants';
import {ROUTES, SWITCHABLE_MODES} from './routes';

export const isValidIndex = (index, testedArray) => (Array.isArray(testedArray) && (index >= 0) && (index < testedArray.length));

export const getInitialMemorized = (length) => {
    return '?'.repeat(length).split('').map((item, ind) => (({index: ind, inactive: false})));
};

export const getActiveAmount = (stateArray) => (
    stateArray.reduce((amount, current) => {
        amount += (current.inactive ? 0 : 1);
        return amount;
    }, 0)
);

export const isInactive = (index, stateArray) => {
    return isValidIndex(index, stateArray) ? stateArray[index].inactive : false;
};

export const getCurrentInfo = (currentIndex, maxIndex, randomOrder, controlMode, content, fieldname) => (
    (content && currentIndex >= 0 && randomOrder[currentIndex] <= maxIndex && randomOrder[currentIndex] >= 0) ?
        content[randomOrder[currentIndex]][fieldname] : ''
);

//from PagesCommon - begin

export const shuffleArray = (entities) => {
    let sortableEntities = entities.slice();
    for (let i = sortableEntities.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temporaryValue = sortableEntities[i];
        sortableEntities[i] = sortableEntities[j];
        sortableEntities[j] = temporaryValue;
    }
    return sortableEntities;
};

export const shuffleObjectArray = (entities) => {
    let sortableEntities = entities.slice();
    for (let i = sortableEntities.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temporaryValue = Object.assign({}, sortableEntities[i]);
        sortableEntities[i] = Object.assign({}, sortableEntities[j]);
        sortableEntities[j] = Object.assign({}, temporaryValue);
    }
    return sortableEntities;
};

export const getShuffledContent = (content, controlMode) => (shuffleArray(content).map(item => {
    const origin = getOriginLanguage(controlMode);
    item[FIELDS.ORIGIN_LANGUAGE] = origin;
    item[FIELDS.ORIGIN] = item[origin];
    item[FIELDS.TRANSLATE] = item[getTranslateLanguage(origin)];
    return item;
}));

export const getRandomOrder = (length) => {
    return shuffleArray('?'.repeat(length).split('').map((item, ind) => (ind)));
};

const getLanguageVariant = (controlMode) => {
    let rv = LANGUAGES.RU;
    switch (controlMode) {
        case CONTROL_MODES.CONTROL: {
            rv = LANGUAGES.RU;
            break;
        }
        case CONTROL_MODES.REVERSE: {
            rv = LANGUAGES.EN;
            break;
        }
        case CONTROL_MODES.MIXED:
        default: {
            rv = (Math.random() > 0.5) ? LANGUAGES.EN : LANGUAGES.RU;
        }
    }
    return rv;
};

export const getOriginLanguage = (controlMode) => (getLanguageVariant(controlMode));
export const getTranslateLanguage = (originLanguage) => (originLanguage === LANGUAGES.EN ? LANGUAGES.RU : LANGUAGES.EN);

export const getModeInitialState = ({content, controlMode}) => (
    ({
        currentIndex: 0,
        maxIndex: content.length - 1,
        timerStatus: BORMO_STATUS.STARTED,
        memorized: getInitialMemorized(content.length),
        randomOrder: getRandomOrder(content.length),
        content: getShuffledContent(content, controlMode),
        errorCount: 0,
        okCount: 0,
        wasError: false,
        showSnack: false
    })
);

export const getSpellInitialState = ({content, controlMode}) => {
    return ({
        currentIndex: 0,
        maxIndex: content.length - 1,
        timerStatus: BORMO_STATUS.STARTED,
        content: shuffleObjectArray(content),
        errorCount: 0,
        okCount: 0,
        translate: '',
        wasError: false
    });
};

//from PagesCommon - end

export const getIsBormo = () => (!(window.location.pathname === ROUTES.phrases.href));

export const switchIfNeed = (history, isBormo) => {
    if (SWITCHABLE_MODES.indexOf(window.location.pathname) !== -1) {
        history.push(isBormo ? ROUTES.bormo.href : ROUTES.phrases.href);
    }
};

export const getReorderedArray = (currentIndex, previousOrder) => (
    [
        ...previousOrder.slice(0, currentIndex),
        ...previousOrder.slice(currentIndex + 1),
        previousOrder[currentIndex]
    ]
);

export const getObjectValuesByKeyArray = (sourceObject, keysArray) => (
    keysArray.map(key => sourceObject.hasOwnProperty(key) ? sourceObject[key] : 0)
);

export const getTranslatedPhrase = (dataArray, currentIndex) => (
    Array.isArray(dataArray) && isValidIndex(currentIndex, dataArray) ? dataArray[currentIndex][LANGUAGES.RU] : 'Ошибка: не удалось получить данные');

const getStringCompareResult = (left, right) => {
    if (left > right) {
        return 1;
    } else if (left < right) {
        return -1;
    } else {
        return 0;
    }
};

export const getSortedWords = (entities) =>
    (entities.slice().sort((firstItem, secondItem) => (getStringCompareResult(firstItem, secondItem))));

export const getSortedKeys = (entities) =>
    (Object.keys(entities).slice().sort((firstItem, secondItem) => (getStringCompareResult(firstItem, secondItem))));

export const dataTransform = (data) => {
    const wordsPresence = {};
    data.forEach((el) => {
        const wordsArray = el.english.trim().toLowerCase().split(' ');
        wordsArray.forEach((word) => {
            wordsPresence[word] = (wordsPresence.hasOwnProperty(word)) ? wordsPresence[word] + 1 : 1;
        });
    });
    return wordsPresence;
};

export const strContainSubstr = (str, substr) => (str.toLowerCase().trim().indexOf(substr.toLowerCase().trim()) >= 0);

export const strEqualSubstr = (str, substr) => (str.toLowerCase().trim() === substr.toLowerCase().trim());

export const getTotalPages = (lastLesson, limit = PAGE_LIMIT) => (Math.ceil(lastLesson / limit));

export const getSelectedCourse = (coursesItems, id) =>  (coursesItems.find(course => course.id === id));

export const getRefinedResponse = (responseData, apiKey, currentLesson, isBormo) => {
    let result = responseData;
    if (apiKey === TEST_KEY) {
        const unitsPerLesson = isBormo ? WORDS_PER_LESSON : PHRASES_PER_LESSON;
        result = result.filter((el, ind) => {
            const startInd = currentLesson * unitsPerLesson || 0;
            return (ind >= startInd && ind < (startInd + unitsPerLesson));
        });
    }
    return result;
};

export const getCurrentUrl = (key, currentType) => {
    return DATA_SOURCES[key] ? DATA_SOURCES[key][currentType] : DATA_SOURCES.TEST[currentType];
};

export const getCurrentType = (key, path) => {
    let currentType = path.toUpperCase();
    if (key === TEST_KEY) {
        currentType = (currentType === 'COURSES') ? 'WORDS' : 'PHRASES';
    };
    return currentType;
}