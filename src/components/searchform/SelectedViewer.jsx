import React, {useContext, useEffect, useState} from 'react';
import {IconButton, TextField, Select, MenuItem} from '@material-ui/core';

import MUIIcon from '../icon/MUIIcon';
import {RebormoContext} from '../../context/rebormo/RebormoContext';
import {isValidIndex} from '../../functions';
import {useStyles} from './SelectedViewer.css';

export const SelectedViewer = ({data, selected}) => {
    const [joinedTranslate, setJoinedTraslate] = useState('');
    const [editMode, setEditMode] = useState(false);
    const classes = useStyles();

    const [own, setOwn] = useState([]);
    const [selectedOwn, setSelectedOwn] = useState(null);
    const {courses, sections, isBormo} = useContext(RebormoContext);

    useEffect(() => {
        const userId = 3;
        const ownCourses = isBormo ? courses.filter(item => item.user_id === userId) : sections.filter(item => item.user_id === userId);
        setOwn(ownCourses);
        setSelectedOwn(ownCourses && ownCourses.length > 0 ? ownCourses[0].id : null);
    }, [courses, sections, isBormo]);

    useEffect(() => {
        const translate = selected.reduce((acc, item, ind) =>
            acc + (isValidIndex(item, data) ? (ind > 0 ? ', ' : '') + data[item]['translate'] : ''), '');
        setJoinedTraslate(translate);
    }, [data, selected]);

    const onSwitchEditMode = () => {
        setEditMode(!editMode);
    };

    const onTranslateChange = (evt) => {
        setJoinedTraslate(evt.target.value.trim());
    };

    const onOwnChange = (evt) => {
        setSelectedOwn(evt.target.value);
    }

    const onAdd = () => {
        console.log(selectedOwn);
    }

    const disabledAdd = false; // !selectedOwn || (joinedTranslate.trim() === '');

    //MyTodo disabled Add if words are different

    return (
        <>
            {selected.length > 0 ?
                <>
                    <div className={classes.joinedPanel}>
                        <IconButton color='inherit' fontSize='small' disabled={disabledAdd}
                                    title={selectedOwn ?
                                        'Сохранить в БД (пользовательские уроки)' :
                                        'Нет доступных собственных курсов'}
                                    onClick={onAdd}>
                            <MUIIcon icon={'Add'}/>
                        </IconButton>
                        <IconButton color='inherit' fontSize='small'
                                    title={'Переключить режим изменения подготовленного перевода'}
                                    onClick={onSwitchEditMode}>
                            <MUIIcon icon={'Edit'}/>
                        </IconButton>
                        <TextField
                            id='joined'
                            title={'Заготовка для добавления в БД : ' + joinedTranslate}
                            value={joinedTranslate}
                            fullWidth
                            margin='normal'
                            disabled={!editMode}
                            onChange={onTranslateChange}
                        />
                    </div>
                    {own && own.length > 0 && <Select
                        labelId='own-label'
                        id='own'
                        value={selectedOwn}
                        onChange={onOwnChange}
                    >
                        {own.map(item =>
                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                    }
                </>
                : null
            }
        </>
    );
};