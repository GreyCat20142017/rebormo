import React, {useState} from 'react';
import {Typography, FormGroup, FormControlLabel, Button, TextField, Switch} from '@material-ui/core';

import {useStyles} from './SearchForm.css';
import {KEY_CODES, TEST_KEY} from '../../constants';

const SearchForm = ({apiKey, onlySkyEng = false}) => {

    const [searchText, setSearchText] = useState('');
    const [skyEng, setSkyEng] = useState(onlySkyEng ? true : false);
    const [searchResult, setSearchResult] = useState(null);
    const [currentTranslateSource, setCurrentTranslateSource] = useState(null);
    const [exact, setExact] = useState(true);
    const classes = useStyles();

    const isTestData = !skyEng && !onlySkyEng && (apiKey === TEST_KEY);

    const onSearch = () => {
        setSearchResult(null);
        setCurrentTranslateSource(null);
    };

    const onKeyPress = (evt) => {
        if (evt.keyCode === KEY_CODES.ENTER) {
            evt.preventDefault();
            this.onSearch();
        }
    };

    return (
        <>
            <form className={classes.form} onSubmit={onSearch}>
                <Typography className={classes.formTitle}
                            variant={'h5'}>{'Поиск ' + (onlySkyEng ? '(Skyeng)' : '')}</Typography>
                <FormGroup>
                    <TextField
                        required
                        id='word'
                        label={'Слово для поиска'}
                        value={searchText}
                        fullWidth
                        margin='normal'
                        onKeyDown={onKeyPress}
                        onChange={(evt) => setSearchText(evt.target.value)}
                    />
                    {onlySkyEng ? null :
                        <FormControlLabel
                            control={<Switch checked={skyEng} onChange={() => setSkyEng(!skyEng)} value={skyEng}
                                             color='primary' name='skyEng'/>}
                            label='Искать в SkyEng (on - в skyEng, off - в БД)'
                        />
                    }
                </FormGroup>

                <Button size='small' variant='contained' color='secondary' disabled={isTestData}
                        onClick={onSearch}
                        className={classes.button}
                        title={'Поиск в выбранном источнике'}>
                    {'Поиск ' + (skyEng ? 'в skyEng' : 'в БД') + (isTestData ? '  отключен: тестовые данные!' : '')}
                </Button>
                {skyEng ? null :
                    <FormControlLabel className={classes.exact}
                                      control={<Switch checked={exact} onChange={() => setExact(!exact)}
                                                       value={exact}
                                                       color='primary' name='exact' disabled={isTestData}/>}
                                      label='Искать точное совпадение (on - точное, off - неточное)'
                    />
                }
            </form>

            {searchResult ? <p>{currentTranslateSource}</p> : null}
            {/*    <CurrentTable data={searchResult} currentTranslateSource={currentTranslateSource}*/}
            {/*                  onlySkyEng={onlySkyEng} classes={classes}/> */}


        </>
    );
};

export default SearchForm;