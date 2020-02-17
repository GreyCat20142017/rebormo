import React from 'react';
import {Typography} from '@material-ui/core';

import Loader from '../loader/Loader';
import SkyResults from './results/SkyResults';
import {MUITable} from '../muitable/MUITable';
import {SelectedViewer} from './SelectedViewer';

const CurrentTable = ({onlySkyEng, data}) => (onlySkyEng ?
        <SkyResults data={data}/> :
        <MUITable data={data} columns={['word', 'translate']} withCheckbox={true} SelectedViewer={SelectedViewer}/>
);

export const SearchTable = ({isLoading, error, onlySkyEng, searchResult, currentTranslateSource}) => {
    return (
        <>
            {!isLoading && searchResult &&
            <CurrentTable data={searchResult || []} currentTranslateSource={currentTranslateSource}
                          onlySkyEng={onlySkyEng}/>
            }
            {isLoading && <Loader message={'Поиск...'}/>}
            {error && <Typography color={'error'}>{error}</Typography>}
        </>
    );
}