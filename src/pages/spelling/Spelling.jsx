import React, {useContext, useEffect, useState} from 'react';

import SpellingView from './SpellingView';
import SimpleSnackbar from '../../components/snackbar/SimpleSnackbar';
import VoiceContext from '../../context/voice/VoiceContext';
import {LANGUAGES} from '../../constants';
import {getReorderedArray, isValidIndex, shuffleArray} from '../../functions';
import {theme} from '../../theme';
import {useStyles} from './Spelling.css.js';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';

const Spelling = ({originalContent, currentCourse, currentLesson}) => {
    const [okCount, setOkCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [content, setContent] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const {bormoSpeaker} = useContext(VoiceContext);

    const classes = useStyles(theme);

    useEffect(() => {
        if (originalContent) {
            setContent(shuffleArray(originalContent));
        }
    }, [originalContent]);


    const maxIndex = content ? content.length : 0;
    const currentTranslate = content && isValidIndex(currentIndex, content) ? content[currentIndex][LANGUAGES.RU] : '';
    const currentOrigin = content && isValidIndex(currentIndex, content) ? content[currentIndex][LANGUAGES.EN] : '';

    const refineSpellingOkStatus = () => {
        setShowHint(false);
        setOkCount(okCount + 1);
        setCurrentIndex((currentIndex === maxIndex) ? 0 : currentIndex + 1);
    };

    const onTranslateValidate = (translate) => {
        let result = false;
        if (content[currentIndex][LANGUAGES.EN].trim() === translate.trim()) {
            bormoSpeaker.speak(translate);
            refineSpellingOkStatus();
            result = true;
        } else {
            setErrorCount(errorCount + 1);
            setShowHint(false);
            result = false;
        }
        return result;
    };

    const onRestart = () => {
    };

    const hideHint = () => {
        setShowHint(false);
    };

    const onSkip = () => {
        setContent(getReorderedArray(currentIndex, content));
    };

    const onHint = () => {
        setErrorCount(errorCount + 1);
        setShowHint(true);
    };

    return (
        content ?
            <>
                <SpellingView classes={classes} okCount={okCount} errorCount={errorCount}
                              content={content} currentCourse={currentCourse} currentLesson={currentLesson}
                              currentTranslate={currentTranslate} showHint={showHint} setShowHint={setShowHint}
                              onRestart={onRestart} onSkip={onSkip} onHint={onHint}
                              onTranslateValidate={onTranslateValidate}/>
                <SimpleSnackbar open={showHint} message={currentOrigin} onSnackClose={hideHint}/>
            </> :
            <ContentMissingMessage/>
    );
};

export default Spelling;