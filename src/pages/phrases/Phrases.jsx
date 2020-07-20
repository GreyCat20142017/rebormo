import React, {useState, useEffect, useContext} from 'react';

import PhrasesView from './PhrasesView';
import {dataTransform, isValidIndex} from '../../functions';
import {theme} from '../../theme';
import {useStyles} from './Phrases.css';
import {useHotkeys} from '../../hooks/hooks';
import {HOTKEYS} from '../../constants';
import {UIContext} from '../../context/ui/UIContext';

const Phrases = ({content}) => {
    const [wordsContent, setWordsContent] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentClicked, setCurrentClicked] = useState({});
    const [okCount, setOkCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [wasError, setWasError] = useState(false);
    const [keyboardMode, setKeyboardMode] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hintWasTaken, setHintWasTaken] = useState(false);

    const {messageShow} = useContext(UIContext);


    const [result, setResult] = useState('');
    const classes = useStyles(theme);


    useEffect(() => {
        setWordsContent(dataTransform(content));
    }, [content]);


    const onWordClick = (word) => {
        if (!keyboardMode && wordsContent[word] > 0) {
            setWordsContent({...wordsContent, [word]: wordsContent[word] - 1});
            setCurrentClicked({...currentClicked, [word]: (currentClicked[word] || 0) + 1});
            setResult(result + ' ' + word);
        }
    };

    const onRestart = () => {
        setCurrentClicked({});
        setCurrentIndex(0);
        setResult('');
    };

    const returnBack = () => {
        if (!keyboardMode) {
            const words = {...wordsContent};
            Object.entries(currentClicked).forEach(([word, amount]) => {
                words[word] = words[word] + amount;
            });
            setWordsContent(words);
            setCurrentClicked({});
        }
    };

    const onSwitchMouseKeyboard = () => {
        returnBack();
        setResult('');
        setKeyboardMode(!keyboardMode);
    };

    const onCancel = () => {
        setResult('');
        returnBack();
    };

    const onCheckCorrectness = () => {

        const correct = (content[currentIndex]['english'].toLowerCase().trim() === result.toLowerCase().trim());
        const nextIndex = correct ? (isValidIndex(currentIndex + 1, content) ? currentIndex + 1 : 0) : currentIndex;

        if (correct) {
            setOkCount(okCount + 1);
            setResult('');
            setWasError(false);
        } else {
            setErrorCount(setErrorCount + 1);
            setWasError(true);
            messageShow(
                'Ошибка: "' + result + '" - это неправильный перевод фразы "' + content[currentIndex]['russian'] + '"',
                200
            );
        }
        setCurrentIndex(nextIndex);
    };

    const onHint = () => {
        setErrorCount(errorCount + 1);
        messageShow(content[currentIndex].english);
        setHintWasTaken(true);
        returnBack();
        setCurrentClicked({});
    };

    useHotkeys({
        [HOTKEYS.H]: onHint,
        [HOTKEYS.R]: onRestart,
        [HOTKEYS.K]: onSwitchMouseKeyboard,
        [HOTKEYS.D]: onCancel,
        [HOTKEYS.E]: onCheckCorrectness
    });

    const isFinished = (Object.keys(wordsContent).filter(item => wordsContent[item] !== 0).length === 0);
    const finalMessage = `Статистика. Всего фраз: ${okCount} , число ошибок: ${errorCount}`;
    const phrasesProps = {
        classes, currentIndex, content, wordsContent, keyboardMode, isFinished, finalMessage, wasError,
        onWordClick, onRestart, onSwitchMouseKeyboard, onCancel, onCheckCorrectness, result, setResult,
        showHint, setShowHint, hintWasTaken, setHintWasTaken
    };


    return (
        <PhrasesView {...phrasesProps}/>
    )
};

export default Phrases;