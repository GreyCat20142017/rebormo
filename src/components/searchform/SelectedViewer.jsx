import React, {useContext, useEffect, useState} from 'react';
import {IconButton, TextField, Select, MenuItem, Typography} from '@material-ui/core';

import MUIIcon from '../icon/MUIIcon';
import {RebormoContext} from '../../context/rebormo/RebormoContext';
import {UserContext} from '../../context/user/UserContext';
import {UIContext} from '../../context/ui/UIContext';
import Word from '../../classes/Word';
import {isValidIndex} from '../../functions';
import {useStyles} from './SelectedViewer.css';

export const SelectedViewer = ({data, selected}) => {
    const [joinedTranslate, setJoinedTraslate] = useState('');
    const [origin, setOrigin] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [own, setOwn] = useState([]);
    const [selectedOwn, setSelectedOwn] = useState(null);
    const {courses, sections, isBormo} = useContext(RebormoContext);
    const {messageShow} = useContext(UIContext);
    const [{currentUser}] = useContext(UserContext);
    const classes = useStyles();

    const userId = currentUser['id'] || 1;

    useEffect(() => {
        const ownCourses = isBormo ? courses.filter(item => item.user_id === userId) : sections.filter(item => item.user_id === userId);
        setOwn(ownCourses);
        setSelectedOwn(ownCourses && ownCourses.length > 0 ? ownCourses[0].id : null);
    }, [courses, sections, isBormo, userId]);

    useEffect(() => {
        const translate = selected.reduce((acc, item, ind) =>
            acc + (isValidIndex(item, data) ? (ind > 0 ? ', ' : '') + data[item]['translate'] : ''), '');
        setOrigin(new Set(selected.map(item => data[item]['word'])));
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
    };

    const onAdd = () => {
        const onResult = (result) => messageShow(result);
        const values = Array.from(origin);
        const first = values.length > 0 ? values[0] : '';
        const word = new Word(first, joinedTranslate, selectedOwn, onResult);
        word.create();
    };


    const disabledAdd = !selectedOwn || (joinedTranslate.trim() === '') || (origin.size > 1);


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
                    <Typography className={classes.comment} variant={'caption'} color={'secondary'}>
                        Для добавления данных в БД должен быть выбран один из Ваших собственных курсов, выбранные английские слова должны быть одинаковы,
                        перевод не должен быть пустой строкой
                    </Typography>
                </>
                : null
            }
        </>
    );
};