import React, {useContext, useEffect, useState} from 'react';
import {Container} from '@material-ui/core';

import {SearchForm} from './SearchForm';
import {SearchTable} from './SearchTable';
import {UIContext} from '../../context/ui/UIContext';
import {getSearchParams, getSearchUrl, mapApiData} from '../../functions';
import {TEST_KEY, TRANSLATE_SOURCES} from '../../constants';
import {useFetch} from '../../hooks/hooks';

const SearchFormContainer = ({apiKey, onlySkyEng = false}) => {

    const [searchText, setSearchText] = useState('');
    const [skyEng, setSkyEng] = useState(onlySkyEng ? true : false);
    const [searchResult, setSearchResult] = useState(null);
    const [currentTranslateSource, setCurrentTranslateSource] = useState(TRANSLATE_SOURCES.JSON);
    const [exact, setExact] = useState(false);
    const [{isLoading, error, response}, {doFetch, clearFetchResults}] = useFetch();
    const {messageShow} = useContext(UIContext);

    useEffect(() => {
        setSearchResult(null);
    }, [apiKey, onlySkyEng, skyEng, exact]);

    useEffect(() => {
        if (onlySkyEng) {
            setSkyEng(true);
        }
    }, [onlySkyEng]);

    useEffect(() => {
        if (response) {
            const refinedSearchResult = response ?
                mapApiData(response, currentTranslateSource, onlySkyEng, apiKey, searchText, exact) :
                response;
            setSearchResult(refinedSearchResult);
            clearFetchResults();
        }
    }, [response, currentTranslateSource, onlySkyEng, apiKey, searchText, exact, clearFetchResults]);

    useEffect(() => {
        setCurrentTranslateSource(skyEng ?
            TRANSLATE_SOURCES.SKYENG : (apiKey === TEST_KEY ?
                    TRANSLATE_SOURCES.JSON :
                    TRANSLATE_SOURCES.DB
            ));
    }, [skyEng, apiKey]);

    const onSearch = (trimmedText) => {
        setSearchText(trimmedText);
        setSearchResult(null);
        if (trimmedText !== '') {
            const params = getSearchParams(currentTranslateSource, apiKey, trimmedText, exact);
            const url = getSearchUrl(currentTranslateSource, apiKey);
            doFetch({method: 'get', url: url, params: params});
        } else {
            messageShow('Должен быть заполнен текст для поиска!');
        }
    };

    const onChangeSearchSource = () => {
        const newSkyEng = !skyEng;
        setSkyEng(newSkyEng);
        setCurrentTranslateSource(newSkyEng ?
            TRANSLATE_SOURCES.SKYENG : (apiKey === TEST_KEY ?
                    TRANSLATE_SOURCES.JSON :
                    TRANSLATE_SOURCES.DB
            ));
    };

    const tableProps = {isLoading, error, onlySkyEng, searchResult, currentTranslateSource, exact};
    const formProps = {
        isLoading, onlySkyEng, skyEng, currentTranslateSource, exact, setExact,
        onChangeSearchSource, onSearch
    };

    return (
        <Container>
            <SearchForm {...formProps} />
            {searchResult && <SearchTable {...tableProps}/>}
        </Container>
    );
};

export default SearchFormContainer;