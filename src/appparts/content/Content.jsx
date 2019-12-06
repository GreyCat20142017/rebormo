import React, {useEffect} from 'react';
import Loader from '../../components/loader/Loader';


const Content = ({content, apiKey, currentCourse, currentLesson, isLoading, error, onContentLoading}) => {
    useEffect(() => {
        if (currentCourse && currentLesson && apiKey) {
            onContentLoading(currentCourse, currentLesson, apiKey);
        }
    }, [onContentLoading, currentCourse, currentLesson, apiKey]);

    return (
        isLoading ? <Loader/> :
            (error ? <p>{error}</p> : null)
    );
};

export default Content;