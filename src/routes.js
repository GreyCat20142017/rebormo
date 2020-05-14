import {SERVER_ROOT} from './constants';

export const BORMO_COMMON = SERVER_ROOT + 'bormocom';

export const ROUTES = {
    main: {
        href: SERVER_ROOT,
        title: 'Главная',
        icon: 'Home',
        'exact': true
    },
    bormo: {
        href: BORMO_COMMON + '/bormo',
        title: 'Бормо',
        icon: 'Bormo'
    },
    control: {
        href: BORMO_COMMON + '/control',
        title: 'Контроль',
        icon: 'Control'
    },
    reverse: {
        href: BORMO_COMMON + '/reverse',
        title: 'Контроль наоборот',
        icon: 'Reverse'
    },
    spelling: {
        href: BORMO_COMMON + '/spelling',
        title: 'Правописание',
        icon: 'Spelling'
    },
    check: {
        href: BORMO_COMMON + '/check',
        title: 'Проверка',
        icon: 'Check'
    },
    phrases: {
        href: SERVER_ROOT + 'phrases',
        title: 'Фразы',
        icon: 'Extension',
        'submenu': true
    },
    search: {
        href: SERVER_ROOT + 'search',
        title: 'Поиск',
        icon: 'Search',
        'submenu': true
    },
    skyeng: {
        href: SERVER_ROOT + 'skyeng',
        title: 'SkyEng',
        icon: 'Sky',
        'submenu': true
    },
    config: {
        href: SERVER_ROOT + 'config',
        title: 'Настройка',
        icon: 'Settings',
        'submenu': true
    },
    help: {
        href: SERVER_ROOT + 'help',
        title: 'Подсказка',
        icon: 'Help',
        'submenu': true
    },
    about: {
        href: SERVER_ROOT + 'about',
        title: 'О программе',
        icon: 'InfoO',
        'submenu': true
    }

};

export const SWITCHABLE_MODES = [
    ROUTES.main.href,
    ROUTES.search.href,
    ROUTES.skyeng.href
];

export const BORMO_MODES = [
    ROUTES.bormo,
    ROUTES.control,
    ROUTES.reverse,
    ROUTES.spelling,
    ROUTES.check
];

export const HOTKEY_REDIRECTS = {
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

export const HIDE_WHEN = {
    AUTH: 'authenticated',
    NOT_AUTH:  'not authenticated',
    NEVER: 'never'
};

export const AUTH_ROUTES = {
    SIGN_IN: {
        href: '/login',
        title: 'Вход',
        label: '',
        icon: '',
        userSubmenu: true,
        hide: HIDE_WHEN.AUTH
    },
    SIGN_UP: {
        href: '/register',
        title: 'Регистрация',
        label: '',
        icon: '',
        userSubmenu: true,
        hide: HIDE_WHEN.AUTH
    },
    LOGOUT: {
        href: '/logout',
        title: 'Выход',
        label: '',
        icon: '',
        userSubmenu: true,
        hide: HIDE_WHEN.NOT_AUTH
    },
    PROFILE: {
        href: '/profile',
        title: 'Профиль',
        label: '',
        icon: '',
        userSubmenu: true,
        hide: HIDE_WHEN.NOT_AUTH
    }
};