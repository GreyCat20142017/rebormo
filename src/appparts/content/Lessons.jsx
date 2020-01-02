import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, ButtonGroup, Container, Fab, Paper} from '@material-ui/core';

import {PAGE_LIMIT} from '../../constants';
import BormoIcon from '../../components/icon/BormoIcon';
import {switchIfNeed} from '../../functions';
import {useStyles} from '../../App.css';
import {PageSelector} from './PageSelector';

const getLessonsPage = (currentPage, lessonsCount) => {
    let list = [];
    const start = (currentPage - 1) * PAGE_LIMIT + 1;
    const finish = (start + PAGE_LIMIT - 1  >= lessonsCount) ? lessonsCount : currentPage * PAGE_LIMIT;
    for (let i = start; i <= finish; i++) {
        list.push(i);
    }
    return list;
};

const Lessons = ({
                     apiKey, currentCourse, currentLesson, currentPage, totalPages, lessonsCount,
                     onLessonSelect, onPageSelect,
                     isBormo, onPrevPage, onNextPage, history
                 }) => {
    const classes = useStyles();
    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    const onLessonClick = (el) => {
        onLessonSelect(el);
        switchIfNeed(history, isBormo);
    };

    return (
        currentCourse ?

            <Paper className={classes.courses}>
                <Container className={classes.paper}>
                    {getLessonsPage(currentPage, lessonsCount).map(el =>
                        <Fab className={classes.lessonBtn} size={'small'} key={el}
                             color={el === currentLesson ? 'primary' : 'secondary'}
                             onClick={() => onLessonClick(el)}
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
                <PageSelector currentPage={currentPage} totalPages={totalPages} onPageSelect={onPageSelect}/>
            </Paper>
            : null
    );
};

export default withRouter(Lessons);

