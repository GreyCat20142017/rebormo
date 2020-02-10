import React from 'react';
import {Button, Typography, Paper} from '@material-ui/core';
import {ArrowRight} from '@material-ui/icons';
import {useStyles} from '../../App.css';

import Loader from '../../components/loader/Loader';

const isCurrent = (currentCourse, course) => (
    (currentCourse && (parseInt(course['id']) === parseInt(currentCourse['id'])))
);

const Courses = ({apiKey, items, current, isLoading, error, onCourseSelect}) => {

    const classes = useStyles();
    return (
        <>
            {isLoading ? <Loader/> :
                <Paper className={classes.courses}>
                    {items.map((course, ind) =>
                        <Button key={course['id']} onClick={() => onCourseSelect(course['id'], apiKey)}
                                className={classes.courseBtn}
                                color={isCurrent(current, course) ? 'primary' : 'secondary'}>
                            {isCurrent(current, course) ? <ArrowRight/> : null}
                            {course['name']}&nbsp;({course['lastlesson']})
                        </Button>
                    )}
                    <Typography>{error}</Typography>
                </Paper>
            }
        </>

    );
};

export default Courses;