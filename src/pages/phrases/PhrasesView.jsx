import React, {useState} from 'react';
import {Badge, Button, Paper, Typography, TextField} from '@material-ui/core';

import SimpleToolbar from '../../components/toolbar/SimpleToolbar';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';
import {getSortedKeys, getTranslatedPhrase} from '../../functions';
import {TOOLBAR_TYPES} from '../../constants';

const PhraseForm = ({classes, keyboardMode, wasError = false, onCheckCorrectness}) => {
    const [result, setResult] = useState('');
    const onTranslateChange = (evt) => setResult(evt.target.value);
    return (
        <Paper className={classes.paper}>
            {keyboardMode ?
                <form className={classes.form} onSubmit={onCheckCorrectness}>
                    <TextField
                        required
                        autoFocus={true}
                        id='result'
                        label={wasError ? 'Нужно исправить ошибку:' : 'Перевод:'}
                        value={result}
                        fullWidth
                        margin='normal'
                        onChange={onTranslateChange}
                    />
                </form>
                :
                <Typography variant='h5' className={classes.typo}>
                    {result ? result : '?'}
                </Typography>
            }
        </Paper>

    );
};

const PhrasesView = ({
                         classes, content, currentIndex, wordsContent, keyboardMode, isFinished,
                         finalMessage, wasError,
                         onWordClick, onRestart, onSwitchMouseKeyboard, onCancel, onCheckCorrectness
                     }) => (
    wordsContent && Object.keys(wordsContent).length > 0 ?
        <div className={classes.wrapper}>
            <ul className={classes.wordsWrapper}>
                {getSortedKeys(wordsContent).map((item, ind) =>
                    (
                        <li key={ind}>
                            <>
                                {keyboardMode ? null :
                                    <Badge className={classes.badge} color='secondary'
                                           badgeContent={wordsContent[item]}>
                                        <span></span>
                                    </Badge>
                                }
                                <Button key={ind} variant='contained' color='primary' className={classes.wordButton}
                                        size={'small'}
                                        disabled={(wordsContent[item] <= 0)}
                                        onClick={() => onWordClick(item)}>
                                    {item}
                                </Button>
                            </>
                        </li>
                    ))}
            </ul>

            <Paper className={classes.paper}>
                <Typography variant='h5' className={classes.typo} color={isFinished ? 'error' : 'inherit'}>
                    {isFinished ? finalMessage : getTranslatedPhrase(content, currentIndex)}
                </Typography>
            </Paper>

            <PhraseForm classes={classes} keyboardMode={keyboardMode} wasError={wasError}
                        onCheckCorrectness={onCheckCorrectness}/>

            <SimpleToolbar toolbar={TOOLBAR_TYPES.PHRASES} className={classes.toolbar}
                           onRestart={onRestart} onSwitchMouseKeyboard={onSwitchMouseKeyboard}
                           onCheckCorrectness={onCheckCorrectness} onCancel={onCancel}/>

        </div> :
        <ContentMissingMessage/>

);

export default PhrasesView;