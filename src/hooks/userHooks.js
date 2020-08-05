import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';

import {LS_TOKEN} from '../constants';
import {useLs} from './hooks';

export const getHeaders = (token) => {
    let headers = {};
    if (token) {
        headers = {
           'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }
    }
    return headers;
};

export const useUser = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});
    const [token] = useLs(LS_TOKEN);

    const doFetch = useCallback((options = {}) => {
        setOptions(options);
        setIsLoading(true);
    }, []);

    useEffect(() => {
        let unmounted = false;
        if (!isLoading) {
            return;
        }

        const requestOptions = {
            ...options,
            headers: getHeaders(token),
            url: url
        };

        axios(requestOptions)
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

    return [{isLoading, response, error}, doFetch];
};