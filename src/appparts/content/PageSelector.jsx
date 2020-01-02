import React, {useEffect, useState} from 'react';
import {Button, Slider} from '@material-ui/core';

export const PageSelector = ({currentPage, totalPages, onPageSelect}) => {
    const [value, setValue] = useState(currentPage);
    const onSliderChange = (event, newValue) => setValue(newValue);
    useEffect(() => {
        setValue(currentPage);
    }, [currentPage]);
    return (
        totalPages > 1 ?
            <>
                <Slider
                    value={value} onChange={onSliderChange}
                    aria-labelledby='выбор страницы'
                    valueLabelDisplay='auto'
                    step={1}
                    min={1}
                    max={totalPages}/>
                <Button color='primary' onClick={() => onPageSelect(value)} size='small'
                        title={'Перейти к странице №' + value}>к странице № {value}</Button>
            </> : null
    );
};