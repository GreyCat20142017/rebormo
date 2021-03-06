import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, ButtonGroup, Container, Fab, Paper} from '@material-ui/core';

import {PAGE_LIMIT} from '../../constants';
import MUIIcon from '../../components/icon/MUIIcon';
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
                     apiKey, current, currentLesson, currentPage, totalPages, lessonsCount,
                     onLessonSelect, onPageSelect, onPrevPage, onNextPage,
                     isBormo, history
                 }) => {
    const classes = useStyles();
    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    const onLessonClick = (el) => {
        onLessonSelect(el);
        switchIfNeed(history, isBormo);
    };

    return (
        current ?

            <Paper className={classes.courses}>
                <Container className={classes.paper}>
                    {getLessonsPage(currentPage, lessonsCount).map(el =>
                        <Fab className={classes.lessonBtn} size={'small'} key={el}
                             color={el === currentLesson ? 'primary' : 'secondary'}
                             onClick={() => onLessonClick(el)}
                             title={'Загрузить контент урока № ' + el + ' (курс "' + current['name'] + '")  - ' + apiKey}>
                            {el}
                        </Fab>
                    )}
                </Container>
                <ButtonGroup>
                    <Button color={'inherit'} onClick={onPrevPage}
                            disabled={isFirst} title={'Предыдущая страница'}>
                        <MUIIcon icon={'Prev'}/>
                    </Button>
                    <Button color={'inherit'} onClick={onNextPage}
                            disabled={isLast} title={'Следующая страница'}>
                        <MUIIcon icon={'Next'}/>
                    </Button>
                </ButtonGroup>
                <PageSelector currentPage={currentPage} totalPages={totalPages} onPageSelect={onPageSelect}/>
            </Paper>
            : null
    );
};

export default withRouter(Lessons);

