import React from 'react';
import SearchForm from '../../components/searchform/SearchForm';


const Search = ({apiKey, onlySkyEng}) => (
    <SearchForm apiKey={apiKey} onlySkyEng={onlySkyEng}/>
);

export default Search;
