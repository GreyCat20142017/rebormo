import React from 'react';
import Loader from '../../components/loader/Loader';

const Content = ({isLoading, error}) => {
    return (
        isLoading ? <Loader/> : (error ? <p>{error}</p> : null)
    );
};

export default Content;