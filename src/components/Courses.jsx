import React, {useEffect} from 'react';
import Loader from './loader/Loader';

const Courses = ({courses, currentCourse, isLoading, error, onCourseSelect, onCoursesLoading}) => {
    useEffect(() => {
        onCoursesLoading();
    }, [onCoursesLoading]);


    return (
        <>
            {isLoading ? <Loader/> :
                <ul className='list-unstyled'>
                    {courses.map((course, ind) =>
                        <li key={ind}>
                            <button onClick={() => onCourseSelect(course.id)}
                                    className={'btn btn-sm ' + (parseInt(course.id) === parseInt(currentCourse) ? 'btn-light-green' : 'btn-mdb-color')}>
                                {course.name}&nbsp;({course.lastlesson})
                            </button>
                        </li>)}
                </ul>}
            <p>{error}</p>
        </>

    );
};

export default Courses;