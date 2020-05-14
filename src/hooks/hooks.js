import {useEffect} from 'react';

export const useHotkeys = (hotkeys) => {
    const en = 'qwertyuiopasdfghjklzxcvbnm';
    const ru = 'йцукенгшщзфывапролдячсмить';
    useEffect(() => {
        const onKeyPress = (evt) => {
            if (evt.altKey) {
                let charCode = String.fromCharCode(evt.which).toLowerCase();
                const positionRu = ru.indexOf(charCode);
                charCode = positionRu !== -1 ? en[positionRu] : charCode;
                if (hotkeys[charCode]) {
                    hotkeys[charCode]();
                }
            }
        };
        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [hotkeys]);
};

export const useKeyPress = (key, callback) => {
    useEffect(() => {
        const onKeyPress = (evt) => {
            if (evt.keyCode === key) {
                callback();
            }
        };

        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [key, callback]);
};


