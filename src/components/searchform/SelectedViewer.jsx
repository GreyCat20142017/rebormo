import React, {useEffect, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {useStyles} from './SelectedViewer.css';
import MUIIcon from '../icon/MUIIcon';
import {isValidIndex} from '../../functions';

export const SelectedViewer = ({data, selected}) => {
    const [joinedTranslate, setJoinedTraslate] = useState('');
    const [editMode, setEditMode] = useState(false);
    const classes = useStyles();

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

    //MyTodo disabled Add if words are different
    return (
        <>
            {selected.length > 0 ?
                <div className={classes.joinedPanel}>
                    <IconButton color='inherit' fontSize='small' disabled={true}
                                title={'Сохранить в БД (пользовательские уроки)'}>
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
                : null
            }
        </>
    );
};