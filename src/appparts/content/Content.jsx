import React, {useEffect} from 'react';
import Loader from '../../components/loader/Loader';


const Content = ({content, apiKey, isBormo = true, currentCourse, currentLesson, isLoading, error, onContentLoading}) => {
    useEffect(() => {
        if (currentCourse && currentLesson && apiKey) {
            onContentLoading(currentCourse.id, currentLesson, apiKey, isBormo);
        }
    }, [onContentLoading, currentCourse, currentLesson, apiKey, isBormo]);

    return (
        isLoading ? <Loader/> :
            (error ? <p>{error}</p> : null)
    );
};

export default Content;