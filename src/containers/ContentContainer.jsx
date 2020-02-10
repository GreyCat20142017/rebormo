import React, {useContext} from 'react';
import {RebormoContext} from '../context/rebormo/RebormoContext';
import Content from '../appparts/content/Content';

const ContentContainer = (props) => {
    const {apiKey, content, currentCourse, currentLesson, error, isLoading, isBormo} = useContext(RebormoContext);
    const contentProps = {apiKey, content, currentCourse, currentLesson, error, isLoading, isBormo};
    return (
        <Content {...contentProps}/>
    );
};

export default ContentContainer;