import React, {useContext, useEffect, useState} from 'react';

import {BORMO_STATUS, CONTROL_MODES, FIELDS, LANGUAGES, HOTKEYS} from '../../constants';
import {
    getCurrentInfo,
    getInitialMemorized,
    getRandomOrder,
    getReorderedArray,
    getShuffledContent,
    getTranslateLanguage
} from '../../functions';

import ControlView from './ControlView';
import VoiceContext from '../../context/voice/VoiceContext';
import SimpleSnackbar from '../../components/snackbar/SimpleSnackbar';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';
import {useHotkeys} from '../../hooks/hooks';
import {useControlModeStyles} from './Control.css';

const Control = ({originalContent, currentLesson, currentCourse, controlMode = CONTROL_MODES.CONTROL}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [timerStatus, setTimerStatus] = useState(BORMO_STATUS.STARTED);
    const [memorized, setMemorized] = useState([]);
    const [randomOrder, setRandomOrder] = useState([]);
    const [content, setContent] = useState([]);
    const [errorCount, setErrorCount] = useState(0);
    const [okCount, setOkCount] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const {bormoSpeaker} = useContext(VoiceContext);
    const classes = useControlModeStyles();


    useEffect(() => {
        if (originalContent) {
            setRandomOrder(getRandomOrder(originalContent.length));
            setContent(getShuffledContent(originalContent, controlMode));
            setMemorized(getInitialMemorized(originalContent.length));
            setTimerStatus(BORMO_STATUS.STARTED);
            setErrorCount(0);
            setOkCount(0);
            setCurrentIndex(0);
            setShowHint(false);
        }
    }, [originalContent, controlMode]);

    const onSkip = () => {
        setRandomOrder(randomOrder => getReorderedArray(currentIndex, randomOrder));
    };

    const onHint = () => {
        setErrorCount((errorCount) => errorCount + 1);
        setShowHint(true);
    };

    const onRestart = () => {

    }

    useHotkeys({[HOTKEYS.H]: onHint, [HOTKEYS.S]: onSkip, [HOTKEYS.R]: onRestart});

    const onDebouncedSwitch = (index) => {
        switchDisableOne(index);
    };

    const hideHint = () => {
        setShowHint(false);
    };

    const switchDisableOne = (index) => {
        const okStatus = (content[index][getTranslateLanguage(controlMode)] === content[randomOrder[currentIndex]][getTranslateLanguage(controlMode)]);
        if (timerStatus === BORMO_STATUS.STARTED && okStatus) {
            onSuccess(index);
            // if (config.instantNextMode) {
            //     moveOn();
            // }
        } else {
            onError();
        }
    };

    const onSuccess = (index) => {
        const maxIndex = content ? content.length : 0;
        speakCurrent(currentIndex, maxIndex, randomOrder, controlMode, content);
        const newMemorized = memorized ? [...memorized.slice(0, index), {
            index: index,
            inactive: !memorized[index].inactive
        }, ...memorized.slice(index + 1)] : [];
        const continueStatus = (currentIndex < maxIndex);
        setMemorized(newMemorized);
        setOkCount(okCount => okCount + 1);
        if (continueStatus) {
            setCurrentIndex(currentIndex => currentIndex + 1);
        } else {
            setTimerStatus(BORMO_STATUS.STOPPED);
        }
    };

    const onError = () => {
        setErrorCount(errorCount => errorCount + 1);
        speakError();
    };

    const speakError = () => (bormoSpeaker.speak('Not right.'));

    const speakCurrent = (currentIndex, maxIndex, randomOrder, controlMode, content) => {
        if (timerStatus === BORMO_STATUS.STARTED) {
            let originLanguage = getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.ORIGIN_LANGUAGE);
            const text = getCurrentInfo(currentIndex, maxIndex, randomOrder, true, content,
                originLanguage === LANGUAGES.RU ? FIELDS.TRANSLATE : FIELDS.ORIGIN);
            bormoSpeaker.speak(text);
        }
    };



    const maxIndex = content ? content.length : 0;
    const currentTranslate = getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.TRANSLATE);
    const currentOrigin = getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.ORIGIN);

    return (
        content ?
            <>
                <ControlView classes={classes} currentCourse={currentCourse} currentLesson={currentLesson}
                             maxIndex={maxIndex} onSkip={onSkip} onHint={onHint}
                             currentIndex={currentIndex} content={content} currentTranslate={currentTranslate}
                             okCount={okCount} errorCount={errorCount} memorized={memorized} controlMode={controlMode}
                             onDebouncedSwitch={onDebouncedSwitch}/>
                <SimpleSnackbar open={showHint} message={currentOrigin} onSnackClose={hideHint}/>
            </> :
            <ContentMissingMessage/>
    );
};

export default Control;