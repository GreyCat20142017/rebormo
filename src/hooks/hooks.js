import {useEffect, useState} from 'react';
import {DEBOUNCE_INTERVAL} from '../constants';

export const useHotKey = () => {
    const [key, setKey] = useState(null);

    useEffect(() => {
        const setFromEvent = evt => {
            const charCode = String.fromCharCode(evt.which).toLowerCase();
            let result = null;
            if (evt.altKey) {
                switch (charCode) {
                    case 's':
                    case 'ы': {
                        evt.preventDefault();
                        result = 'onSkip';
                        break;
                    }
                    case 'h':
                    case 'р': {
                        evt.preventDefault();
                        result = 'onHint';
                        break;
                    }
                    default:
                }
            }
            setKey(result);
        };

        window.addEventListener('keydown', setFromEvent);

        return () => {
            window.removeEventListener('keydown', setFromEvent);
        };
    }, []);
    return key;
};


export const useDebounce = (value, delay = DEBOUNCE_INTERVAL) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );

    return debouncedValue;
};

export const useRebormoStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
};

