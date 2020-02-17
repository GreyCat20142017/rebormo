import React, {useContext, useMemo} from 'react';
import Footer from '../appparts/footer/Footer';
import {RebormoContext} from '../context/rebormo/RebormoContext';

const FooterContainer = (props) => {
    const {apiKey, changeDataSource, getData} = useContext(RebormoContext);

    const footerProps = useMemo(() => ({apiKey, changeDataSource, getData}),
        [apiKey, changeDataSource, getData]);
    return (
        <Footer {...footerProps}/>
    );
};

export default FooterContainer;