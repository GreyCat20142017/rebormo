import {useCallback, useEffect, useState} from 'react';
import {AXIOS_TIMEOUT, LS_TOKEN} from '../constants';
import axios from 'axios';

export const useHotkeys = (hotkeys) => {
    const en = 'qwertyuiopasdfghjklzxcvbnm';
    const ru = 'йцукенгшщзфывапролдячсмить';
    useEffect(() => {
        const onKeyPress = (evt) => {
            if (evt.altKey) {
                evt.preventDefault();
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


export const useLs = (key, initialValue = '') => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(key) || initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
};

export const useLsObj = (key, initialValue = {}) => {
    const [value, setValue] = useState(() => {
        const lsValue = localStorage.getItem(key);
        return lsValue ? JSON.parse(lsValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};
export const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});
    const [token] = useLs(LS_TOKEN);

    const doFetch = useCallback((options = {}) => {
        setOptions(options);
        setIsLoading(true);
    }, []);

    const clearFetchResults = useCallback(() => {
        setResponse(null);
    }, []);

    useEffect(() => {
        let unmounted = false;
        if (!isLoading) {
            return;
        }

        axios({...options, timeout: AXIOS_TIMEOUT})
            .then(res => {
                if (!unmounted) {
                    setResponse(res.data);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                if (!unmounted) {
                    setError(error.message);
                    setIsLoading(false);
                }
            });
        return () => {
            unmounted = true;
        };
    }, [isLoading, url, options, token]);

    return [{isLoading, response, error}, {doFetch, clearFetchResults}];
};