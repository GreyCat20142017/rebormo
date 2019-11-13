import {SERVER_ROOT} from './constants';

const BORMO_COMMON = SERVER_ROOT + 'bormocom';

const ROUTES = {
    main: {
        href: SERVER_ROOT,
        title: 'Главная',
        icon: 'main',
        'exact': true
    },
    bormo: {
        href: BORMO_COMMON + '/bormo',
        title: 'Бормо',
        icon: 'main'
    },
    control: {
        href: BORMO_COMMON + '/control',
        title: 'Контроль',
        icon: 'main'
    },
    reverse: {
        href: BORMO_COMMON + '/reverse',
        title: 'Контроль наоборот',
        icon: 'main'
    },
    spelling: {
        href: BORMO_COMMON + '/spelling',
        title: 'Правописание',
        icon: 'main'
    },
    check: {
        href: BORMO_COMMON + '/check',
        title: 'Проверка',
        icon: 'main'
    },
    phrases: {
        href: SERVER_ROOT + 'phrases',
        title: 'Фразы',
        icon: 'main',
        'submenu': true
    },
    search: {
        href: SERVER_ROOT + 'search',
        title: 'Поиск',
        icon: 'main',
        'submenu': true
    },
    skyeng: {
        href: SERVER_ROOT + 'skyeng',
        title: 'SkyEng',
        icon: 'main',
        'submenu': true
    },
    config: {
        href: SERVER_ROOT + 'config',
        title: 'Настройка',
        icon: 'main',
        'submenu': true
    }
};

const SWITCHABLE_MODES = [
    ROUTES.main,
    ROUTES.search,
    ROUTES.phrases,
    ROUTES.skyeng,
];

const BORMO_MODES = [
    ROUTES.bormo,
    ROUTES.control,
    ROUTES.reverse,
    ROUTES.spelling,
    ROUTES.check
];

const HOTKEY_REDIRECTS = {
    'm': ROUTES.bormo.href,
    'ь': ROUTES.bormo.href,
    'c': ROUTES.control.href,
    'с': ROUTES.control.href,
    'o': ROUTES.spelling.href,
    'щ': ROUTES.spelling.href,
    'i': ROUTES.reverse.href,
    'ш': ROUTES.reverse.href,
    'v': ROUTES.check.href,
    'м': ROUTES.check.href
};

export {
    ROUTES,
    BORMO_MODES,
    SWITCHABLE_MODES,
    HOTKEY_REDIRECTS,
    BORMO_COMMON
};