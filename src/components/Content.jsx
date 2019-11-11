import React, {useEffect} from 'react';
import Loader from './loader/Loader';

const Content = ({content, currentCourse, currentLesson, isLoading, error, onContentLoading}) => {
    useEffect(() => {
        if (currentCourse && currentLesson) {
            onContentLoading(currentCourse, currentLesson);
        }
    }, [onContentLoading, currentCourse, currentLesson]);

    return (
        <>
            {isLoading ? <Loader/> :
                <ul className='list-unstyled'>
                    {content.map((row, ind) =>
                        <li key={ind}>
                            {row.english} {row.russian}
                        </li>)}
                </ul>}
            <p>{error}</p>
        </>

    );
};

export default Content;