import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

import {AXIOS_TIMEOUT, LS_TOKEN} from '../constants';

export const useLocalStorage = (key, initialValue = '') => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(key) || initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
};

export const useLocalStorageObject = (key, initialValue = {}) => {
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
    const [token] = useLocalStorage(LS_TOKEN);

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