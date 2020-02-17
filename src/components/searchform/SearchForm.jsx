import React, {useState} from 'react';
import {Button, FormControlLabel, FormGroup, Switch, TextField, Typography} from '@material-ui/core';

import {KEY_CODES} from '../../constants';
import {useStyles} from './SearchForm.css';

export const SearchForm = ({
                               isLoading, onlySkyEng, skyEng, exact, currentTranslateSource,
                               setExact, onChangeSearchSource, onSearch
                           }) => {
    const [value, setValue] = useState('');
    const classes = useStyles();

    const onTextChange = (evt) => {
        const text = evt.target.value || '';
        setValue(text.trim());
    };

    const onSubmit = () => {
        onSearch(value.trim());
    };

    const onKeyPress = (evt) => {
        if (evt.keyCode === KEY_CODES.ENTER) {
            evt.preventDefault();
            onSearch(value.trim());
        }
    };

    return (

        <form className={classes.searchForm} onSubmit={onSubmit}>
            <Typography className={classes.formTitle}
                        variant={'h5'}>{'Поиск ' + (onlySkyEng ? '(Skyeng)' : '')}</Typography>
            <FormGroup>
                <TextField
                    required disabled={isLoading}
                    id='word'
                    label={'Слово для поиска'}
                    value={value}
                    fullWidth
                    margin='normal'
                    onKeyDown={onKeyPress}
                    onChange={onTextChange}
                />
                {onlySkyEng ? null :
                    <FormControlLabel
                        control={<Switch checked={skyEng} onChange={onChangeSearchSource} value={skyEng}
                                         disabled={isLoading} color='primary' name='skyEng'/>}
                        label='Искать в SkyEng (on - в skyEng, off - в БД / Json)'
                    />
                }
                {!skyEng && <FormControlLabel control={<Switch checked={exact} disabled={isLoading}
                                                               onChange={() => setExact(!exact)}
                                                               value={exact} color='primary' name='exact'/>}
                                              label='Искать точное совпадение (on - точное, off - неточное)'/>

                }
            </FormGroup>

            <Button size='small' variant='outlined' color='primary' className={classes.searchButton}
                    onClick={onSubmit} disabled={isLoading}
                    title={'Поиск в выбранном источнике'}>
                Поиск в {currentTranslateSource || ''}
            </Button>

        </form>);
};