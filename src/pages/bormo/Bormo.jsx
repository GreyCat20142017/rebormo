import React, {useContext, useEffect, useState, useRef} from 'react';

import VoiceContext from '../../VoiceContext';
import ListPart from './ListPart';
import BasePart from './BasePart';
import {isValidIndex, getInitialMemorized, getActiveAmount} from '../../functions';
import {BORMO_STATUS, TIMER_INTERVAL, WORDS_PER_LESSON} from '../../constants';

import {theme} from '../../theme';
import {useStyles} from './Bormo.css';

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
    const onDebouncedSwitchCurrent = () => {
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

    return (
        <div className='bormo__wrapper'>
            <div className={classes.parts}>

                <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}
                          memorized={memorized} switchDisableOne={onDebouncedSwitch}/>

                <BasePart classes={classes} currentWord={currentWord} currentTranslate={currentTranslate}
                          activeAmount={activeAmount} timerStatus={timerStatus} content={content}
                          onDebouncedSwitchCurrent={onDebouncedSwitchCurrent}
                          timerStart={timerStart} timerPause={timerPause} timerStop={timerStop}/>

                <ListPart content={content} classes={classes} currentIndex={currentIndex}
                          startIndex={Math.floor(WORDS_PER_LESSON / 2)} memorized={memorized}
                          switchDisableOne={onDebouncedSwitch}/>

            </div>
        </div>
    );
};

export default Bormo;