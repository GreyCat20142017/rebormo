import {BORMO_STATUS, CONTROL_MODES, LANGUAGES, FIELDS} from './constants';
import {ROUTES, SWITCHABLE_MODES} from './routes';

export const isValidIndex = (index, testedArray) => (((index >= 0) && (index < testedArray.length)));

export const getInitialMemorized = (length) => {
    return "?".repeat(length).split("").map((item, ind) => (({index: ind, inactive: false})))
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
    return shuffleArray("?".repeat(length).split("").map((item, ind) => (ind)))
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
}

//from PagesCommon - end

export const getIsBormo = () => (!(window.location.pathname === ROUTES.phrases.href));

export const getIsBormoByLocation = (path) => (!(path === ROUTES.phrases.href));

export const switchIfNeed = (history, isBormo) => {
    if(SWITCHABLE_MODES.indexOf(window.location.pathname) !== -1) {
        history.push( isBormo ? ROUTES.bormo.href : ROUTES.phrases.href);
    }
};