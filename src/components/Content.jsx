import React, {useEffect} from 'react';
import Loader from './loader/Loader';


const Content = ({content, currentCourse, currentLesson, isLoading, error, onContentLoading}) => {
    useEffect(() => {
        if (currentCourse && currentLesson) {
            onContentLoading(currentCourse, currentLesson);
        }
    }, [onContentLoading, currentCourse, currentLesson]);

    return (


            isLoading ? <Loader/> :
                (error ? <p>{error}</p> : null)



    );
};

export default Content;