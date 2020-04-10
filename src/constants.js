export const voiceParams = {
    volume: {
        default: 1,
        min: 0,
        max: 1,
        step: 0.1,
        title: 'Громкость'
    },
    rate: {
        default: 1,
        min: 0.1,
        max: 10,
        step: 0.1,
        title: 'Скорость'
    },
    pitch: {
        default: 1,
        min: 0,
        max: 2,
        step: 0.1,
        title: 'Высота звука'
    }
};

export const PREFFERABLE_VOICE = 'Google UK English';

export const COURSES_PATH = '/data/courses.json';
export const BORMO_PATH = '/data/bormo.json';
export const SECTIONS_PATH = '/data/sections.json';
export const PHRASES_PATH = '/data/phrases.json';

export const PAGE_LIMIT = 9;
export const ROW_LIMIT = 5;

export const TEST_COUNT = 10;
//WORDS_PER_LESSON и PHRASES_PER_LESSON Изменять только одновременно с константами в bormob и bormophp !!!
export const WORDS_PER_LESSON = 20;
export const PHRASES_PER_LESSON = 7;

export const BORMO_STATUS = {
    STARTED: 'started',
    PAUSED: 'paused',
    STOPPED: 'stopped'
};

export const CONTROL_MODES = {
    CONTROL: 'control',
    REVERSE: 'reverse control',
    MIXED: 'mixed'
};

export const FIELDS = {
    ORIGIN_LANGUAGE: 'originLanguage',
    ORIGIN: 'origin',
    TRANSLATE: 'translate'
};

export const VOICE_TEST_PHRASE = 'This is a voice test';

export const DRAWER_WIDTH = 260;
export const DEBOUNCE_INTERVAL = 222;
export const DELAY_TIMEOUT = 1500;

const url = window.location.origin;
export const SERVER_ROOT = (url.match(/github\.io/gi)) ? '/rebormo/' : '/';

export const KEY_CODES = {
    ESC: 27,
    ENTER: 13,
    SPACE: 32,
    TAB: 9
};

export const LANGUAGES = {
    EN: 'english',
    RU: 'russian'
};

export const TIMER_INTERVAL = 3000;

export const SKYENG_URL = `https://dictionary.skyeng.ru/api/public/v1/words/search`;

export const TEST_STATUSES = {
    UNKNOWN: '?',
    TEST_DATA: 'Это тестовые данные',
    ERROR: 'Невозможно получить данные'
};

export const DATA_SOURCES = {
    PHP_LOCAL: {
        COURSES: 'http://bormophpl.local:8080/courses.php',
        WORDS: 'http://bormophpl.local:8080/courses.php',
        SEARCH: 'http://bormophpl.local:8080/search.php',
        SECTIONS: 'http://bormophpl.local:8080/sections.php',
        PHRASES: 'http://bormophpl.local:8080/sections.php',
        TEST: 'http://bormophpl.local:8080/test.php',
        disabled: false,
        COMMENT: 'PHP (loсalhost)'
    },
    LARAVEL_LOCAL: {
        COURSES: 'http://bormolara.local:8080/api/courses',
        WORDS: 'http://bormolara.local:8080/api/courses',
        SEARCH: 'http://bormolara.local:8080/api/search/words',
        SECTIONS: 'http://bormolara.local:8080/api/sections',
        PHRASES: 'http://bormolara.local:8080/api/sections',
        TEST: 'http://bormolara.local:8080/test',
        disabled: false,
        COMMENT: 'Laravel (loсalhost)'
    },
    TEST: {
        COURSES: COURSES_PATH,
        WORDS: BORMO_PATH,
        SECTIONS: SECTIONS_PATH,
        PHRASES: PHRASES_PATH,
        SEARCH: BORMO_PATH,
        disabled: false,
        COMMENT: 'Тестовые данные'
    }
};

export const TEST_KEY = 'TEST';
export const LARA_KEY = 'LARAVEL_LOCAL';


export const API_PATH = {
    LOGIN: 'http://bormolara.local:8080/api/login',
    REGISTER: 'http://bormolara.local:8080/api/register',
    GET_USER: 'http://bormolara.local:8080/api/user',
    UPDATE_USER: 'http://bormolara.local:8080/api/user/update',
    LOGOUT: 'http://bormolara.local:8080/api/user/logout',
    COURSES: 'http://bormolara.local:8080/api/user/courses',
    SECTIONS: 'http://bormolara.local:8080/api/sections',
    WORD_CREATE: 'http://bormolara.local:8080/api/user/word/create'
};

export const LS_TOKEN = 'rebormo_token';
export const LS_TOKEN_EXPIRATION = 'rebormo_token_expiration';
export const LS_TOKEN_REFRESH = 'rebormo_token_refresh';
export const DATA_SOURCE_TOKEN_NAME = 'token';
export const DATA_SOURCE_TOKEN_REFRESH = 'refresh_token';
export const DATA_SOURCE_TOKEN_REFRESH_NAME = 'refreshToken';
export const DATA_SOURCE_TOKEN_EXPIRATION = 'expiresIn';

export const STATUS_OK = 200;

export const TRANSLATE_SOURCES = {
    SKYENG: 'SkyEng',
    DB: 'БД',
    JSON: 'JSON'
};

export const TOOLBAR_TYPES = {
    SPELLING_STARTED: 'spellingStarted',
    SPELLING_STOPPED: 'spellingStopped',
    PHRASES: 'phrases'
};

export const API_BRANCHES = {
    COURSES: 'COURSES',
    PHRASES: 'PHRASES',
    SEARCH: 'SEARCH',
    TEST: 'TEST'
};

export const EXCLUDED_COLUMNS = ['id', 'soundUrl', 'partOfSpeech'];

export const NAMES_RU = {
    id: 'ID',
    text: 'слово',
    partOfSpeech: 'часть речи',
    translationText: 'перевод',
    translationNote: 'примечание',
    transcription: 'транскрипция',
    soundUrl: 'звук'
};

export const MODAL_TYPES = {
    CLOSED: null,
    ABOUT: 'about',
    HELP: ' help'
};

export const MENU_ICON_SIZE = 18;
export const MENU_ICON_COLOR = 'white';

export const SUBMENU_CONTENT = {
    NAVLINK: 'NavLink',
    ITEM: 'MenuItem'
};

export const SNACK_OPEN_TIME =  3000;
export const AXIOS_TIMEOUT = 7000;

export const REBORMO_LS = 'Rebormo';

export const HOTKEYS = {
    S: ['s', 'ы'],
    H: ['h', 'р']
};


export const BASE_URL = '';