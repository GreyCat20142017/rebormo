import React, {useState} from 'react';
import {TextField} from '@material-ui/core';

export const SpellingForm = ({classes, currentTranslate, onTranslateValidate, showHint, setShowHint}) => {
    const [translate, setTranslate] = useState('');

    const onTranslateChange = (evt) => {
        setTranslate(evt.target.value);
        if (showHint) {
            setShowHint(false);
        }
    };

    const onFormValidate = (evt) => {
        evt.preventDefault();
        const result = onTranslateValidate(translate);
        if (result) {
            setTranslate('');
        }
    };

    return (
        <form className={classes.form} onSubmit={onFormValidate}>
            <TextField
                required
                autoFocus={true}
                id='translate'
                label={translate !== currentTranslate && translate !== '' ? 'Ошибка' : 'Перевод:'}
                value={translate}
                fullWidth
                margin='normal'
                onChange={onTranslateChange}
            />
        </form>
    );
};