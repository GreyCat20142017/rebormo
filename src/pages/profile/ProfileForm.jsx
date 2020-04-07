import React, {useContext, useEffect, useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';

import Loader from '../../components/loader/Loader';
import {useUser} from '../../hooks/userHooks';
import {UserContext} from '../../context/user/UserContext';
import {
    API_PATH
} from '../../constants';

export const ProfileForm = ({info}) => {
    const [displayName, setDisplayName] = useState(info['name'] || '');
    const [formError, setFormError] = useState(null);
    const [touched, setTouched] = useState(false);
    const [, dispatch] = useContext(UserContext);
    const [{isLoading: profileIsUpdating, response: profileResponse, error: profileError}, updateProfile] = useUser(API_PATH.UPDATE_USER);

    const errorMessage = 'Все поля должны быть заполнены!';

    useEffect(() => {
        if (!profileResponse) {
            return;
        }
        dispatch({type: 'LOGIN', payload: profileResponse['currentUser']});
    }, [profileResponse, dispatch]);

    const onInputChange = (value, setter) => setter(value);

    const onSubmit = (evt) => {
        evt.preventDefault();
        const ok = (displayName.trim().length > 0);
        setFormError(ok ? null : errorMessage);
        setTouched(true);
        if (ok) {
            const params = {name: displayName};
            updateProfile({
                method: 'post',
                params: params
            });
        }
    };

    return (
        <>
        <form onSubmit={onSubmit}>
            <Typography variant='h6'>Изменение данных пользователя</Typography>
            <TextField
                required autoFocus={true} id='displayName' name='displayName' label={'Имя пользователя'}
                value={displayName} fullWidth
                margin='normal'
                error={touched && displayName.trim().length <= 0}
                onChange={(evt) => onInputChange(evt.target.value, setDisplayName)}/>

            <Button variant={'contained'} color={'primary'} onClick={onSubmit} fullWidth title={'Сохранить изменения'}>
                сохранить
            </Button>

            <Typography variant={'caption'} color={'error'}>{formError}</Typography>
        </form>
            {profileIsUpdating && <Loader message={'Обновление профиля...'}/>}
            {profileError && <Typography variant={'caption'} color={'error'}>{profileError}</Typography>}
        </>
    );
};