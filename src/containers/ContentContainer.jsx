import React, {useContext, useEffect} from 'react';
import {RebormoContext} from '../context/rebormo/RebormoContext';
import Content from '../appparts/content/Content';

const ContentContainer = (props) => {
    const {apiKey, content, currentCourse, currentLesson, error, isLoading, isBormo, deselect} = useContext(RebormoContext);
    const contentProps = {apiKey, currentCourse, currentLesson, error, isLoading, content};

    useEffect(() => {
        deselect();
    }, [isBormo, deselect]);


    return (
        <Content {...contentProps} isBormo={isBormo}/>
    );
};

export default ContentContainer;