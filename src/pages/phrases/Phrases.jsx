import React from 'react';

// import PhrasesView from './PhrasesView';
// import {useStyles} from './Phrases.css';
// import {theme} from '../../theme';
// import {dataTransform, getObjectValuesByKeyArray, getSortedWords} from '../../functions';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';

const Phrases = ({content}) => {
    // const [wordsContent, setWordContent] = useState({});
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [okCount, setOkCount] = useState(0);
    // const [errorCount, setErrorCount] = useState(0);
    // const [wasError, setWasError] = useState(false);
    // const [keyboardMode, setKeyboardMode] = useState(true);
    // const [showHint, setShowHint] = useState(false);
    // const [hintWasTaken, setHintWasTaken] = useState(false);
    // const classes = useStyles(theme);
    //
    // useEffect(() => {
    //     setWordContent(dataTransform(getSortedWords(content)));
    // }, [content]);
    //
    // const onWordClick = () => {
    // };
    // const onRestart = () => {
    // };
    // const onSwitchMouseKeyboard = () => {
    // };
    // const onCancel = () => {
    // };
    // const onCheckCorrectness = () => {
    // };
    //
    // const isFinished = (Object.keys(wordsContent).filter(item => wordsContent[item] !== 0).length === 0);
    // const finalMessage = `Статистика. Всего фраз: ${okCount} , число ошибок: ${errorCount}`;
    // const phrasesProps = {
    //     classes, currentIndex, wordsContent, keyboardMode, isFinished, finalMessage, wasError,
    //     onWordClick, onRestart, onSwitchMouseKeyboard, onCancel, onCheckCorrectness
    // };


    return (
        <>
            {(content && content.length > 0) ? content.map((el, ind) => <p key={ind}>{el['english']}</p>) :
                <ContentMissingMessage/>}
        </>
    );
};

export default Phrases;