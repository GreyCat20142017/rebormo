import React from 'react';
import {PAGE_LIMIT} from '../constants';

const getLessonsPage = (currentPage, lessonsCount) => {
    let list = [];
    const start = (currentPage - 1) * PAGE_LIMIT + 1;
    const finish = (start + PAGE_LIMIT >= lessonsCount) ? lessonsCount : currentPage * PAGE_LIMIT;
    for (let i = start; i <= finish; i++) {
        list.push(i);
    }
    return list;
};

const Lessons = ({currentCourse, currentPage, totalPages, lessonsCount, onLessonSelect, onPrevPage, onNextPage}) => {
    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;
    return (
        currentCourse ?
            <>
                <ul className='list-unstyled'>
                    {getLessonsPage(currentPage, lessonsCount).map(el => (
                        <li key={el}>
                            <button className='btn btn-sm btn-mdb-color' onClick={() => onLessonSelect(el)}>{el}</button>
                        </li>)
                    )}
                </ul>
                <div className="button-group">
                    <button className={'btn btn-sm ' + (isFirst ? '' : 'btn-mdb-color')} onClick={onPrevPage}
                            disabled={isFirst}>
                        prev
                    </button>
                    <button className={'btn btn-sm ' + (isLast ? '' : 'btn-mdb-color')} onClick={onNextPage}
                            disabled={isLast}>
                        next
                    </button>
                </div>
            </> : null
    );
};

export default Lessons;

