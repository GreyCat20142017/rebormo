import {useEffect} from 'react';
import {KEY_CODES} from '../constants';

export const useHotkey = (key, callback) => {
    useEffect(() => {
        const onKeyPress = (evt) => {
            const charCode = String.fromCharCode(evt.which).toLowerCase();
            if (key.indexOf(charCode) >= 0) {
                callback();
            }
        };

        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [key, callback]);
};

export const useKeyPress = (key, callback) => {
    useEffect(() => {
        const onKeyPress = (evt) => {
            if (key === KEY_CODES.ESC) {
                callback();
            }
        };

        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [key, callback]);
};

