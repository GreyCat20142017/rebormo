import React from 'react';
import SearchForm from '../../components/searchform/SearchForm';


const Search = ({APIkey, onlySkyEng}) => (
    <SearchForm APIkey={APIkey} onlySkyEng={onlySkyEng}/>
);

export default Search;
