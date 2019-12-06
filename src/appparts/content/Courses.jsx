import React, {useEffect} from 'react';
import {Button, Typography, Paper} from '@material-ui/core';

import {useStyles} from '../../App.css';

import Loader from '../../components/loader/Loader';

const Courses = ({apiKey, courses, currentCourse, isLoading, error, onCourseSelect, onCoursesLoading}) => {
    useEffect(() => {
        onCoursesLoading(apiKey);
    }, [onCoursesLoading, apiKey]);

    const classes = useStyles();

    return (
        <>
            {isLoading ? <Loader/> :
                <Paper className={classes.courses}>
                    {courses.map((course, ind) =>
                    <Button key={course.id} onClick={() => onCourseSelect(course.id, apiKey)} className={classes.courseBtn}
                            variant={(parseInt(course.id) === parseInt(currentCourse) ? 'contained' : 'outlined')}
                            color={'primary'}>
                        {course.name}&nbsp;({course.lastlesson})
                    </Button>
                    )}
                    <Typography>{error}</Typography>
                </Paper>
            }
        </>

    );
};

export default Courses;