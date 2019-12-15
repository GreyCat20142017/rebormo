import React from 'react';
import {PAGE_LIMIT} from '../../constants';
import {Fab, Button, ButtonGroup, Paper, Container} from '@material-ui/core';

import {useStyles} from '../../App.css';
import BormoIcon from '../../components/icon/BormoIcon';

const getLessonsPage = (currentPage, lessonsCount) => {
    let list = [];
    const start = (currentPage - 1) * PAGE_LIMIT + 1;
    const finish = (start + PAGE_LIMIT >= lessonsCount) ? lessonsCount : currentPage * PAGE_LIMIT;
    for (let i = start; i <= finish; i++) {
        list.push(i);
    }
    return list;
};

const Lessons = ({apiKey, currentCourse, currentLesson, currentPage, totalPages, lessonsCount, onLessonSelect, onPrevPage, onNextPage}) => {
    const classes = useStyles();
    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;
    return (
        currentCourse ?

            <Paper className={classes.courses}>
                <Container className={classes.paper}>
                    {getLessonsPage(currentPage, lessonsCount).map(el =>
                        <Fab className={classes.lessonBtn} size={'small'} key={el}
                             color={el === currentLesson ? 'primary' : 'secondary'}
                             onClick={() => onLessonSelect(el)}
                             title={'Загрузить контент урока № ' + el + ' курс ' + currentCourse + '  - ' + apiKey}>
                            {el}
                        </Fab>
                    )}
                </Container>
                <ButtonGroup>
                    <Button color={'inherit'} onClick={onPrevPage}
                            disabled={isFirst} title={'Предыдущая страница'}>
                        <BormoIcon icon={'Prev'}/>
                    </Button>
                    <Button color={'inherit'} onClick={onNextPage}
                            disabled={isLast} title={'Следующая страница'}>
                        <BormoIcon icon={'Next'}/>
                    </Button>
                </ButtonGroup>
            </Paper>
            : null
    );
};

export default Lessons;

