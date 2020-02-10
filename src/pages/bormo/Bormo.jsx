import React, {useContext, useEffect, useRef, useState} from 'react';

import {BormoView} from './BormoView';
import VoiceContext from '../../context/voice/VoiceContext';
import {getActiveAmount, getInitialMemorized, isValidIndex} from '../../functions';
import {BORMO_STATUS, TIMER_INTERVAL} from '../../constants';
import {theme} from '../../theme';
import {useStyles} from './Bormo.css';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';

const Bormo = ({content}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [memorized, setMemorized] = useState([]);
    const [timerStatus, setTimerStatus] = useState(BORMO_STATUS.STOPPED);
    const timerRef = useRef();
    const {bormoSpeaker} = useContext(VoiceContext);
    const classes = useStyles(theme);

    useEffect(() => {
        if (content && content.length > 0) {
            setMemorized(getInitialMemorized(content.length));
        }
    }, [content, setMemorized]);

    const sayEnglish = (index, content) => {
        bormoSpeaker.speak(isValidIndex(index, content) ? content[index].english : '');
    };

    const currentWord = isValidIndex(currentIndex, content) ? content[currentIndex].english : '';
    const currentTranslate = isValidIndex(currentIndex, content) ? content[currentIndex].russian : '';
    const activeAmount = getActiveAmount(memorized);

    const onDebouncedSwitch = () => {
    };

    const ticks = () => {
        if (memorized) {
            setCurrentIndex((currentIndex) => {
                const current = memorized.filter((item) => (!item.inactive && item.index === currentIndex));
                const before = memorized.filter((item) => (!item.inactive && item.index < currentIndex));
                const after = memorized.filter((item) => (!item.inactive && item.index > currentIndex));
                const active = ((before.length === 0) && (after.length === 0)) ? [...current] : [...after, ...before];
                let nextIndex = currentIndex;
                if ((active.length === 0) && (current.length === 0)) {
                    setTimerStatus(BORMO_STATUS.STOPPED);
                } else {
                    nextIndex = active[0].index;
                    sayEnglish(nextIndex, content);
                }
                return nextIndex;
            });
        }
    };

    const timerStart = () => {
        if (timerStatus !== BORMO_STATUS.STARTED) {
            clearInterval(timerRef.current);
            timerRef.current = setInterval(ticks, TIMER_INTERVAL);
            setTimerStatus(BORMO_STATUS.STARTED);
            if (content) {
                sayEnglish(currentIndex, content);
                setMemorized(getInitialMemorized(content.length));
            }
        }
    };

    const timerPause = () => {
        if (timerStatus === BORMO_STATUS.STARTED) {
            clearInterval(timerRef.current);
            setTimerStatus(BORMO_STATUS.PAUSED);
        }

    };
    const timerStop = () => {
        clearInterval(timerRef.current);
        setTimerStatus(BORMO_STATUS.STOPPED);
        setCurrentIndex(0);
    };

    const props = {
        classes, currentIndex, currentWord, currentTranslate,
        memorized, activeAmount, timerStatus, timerStart, timerPause, timerStop,
        onDebouncedSwitch
    };

    return (
        content ?
            <BormoView {...props} content={content}/> :
            <ContentMissingMessage/>
    );
};

export default Bormo;