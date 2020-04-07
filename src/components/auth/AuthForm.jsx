import React, {useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import is from 'is_js';

const PASSWORD_MIN = 2;

export const AuthForm = ({onSuccess, isSignUp = false, old = ''}) => {
    const [email, setEmail] = useState(old);
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [formError, setFormError] = useState(null);
    const [touched, setTouched] = useState(false);

    const title = isSignUp ? 'Регистрация' : 'Вход';
    const errorMessage = 'Все поля должны быть заполнены! Email быть валидным! Пароль не менее ' + PASSWORD_MIN +
        ' символов! ' + (isSignUp ? ' Повтор пароля должен совпадать с паролем!' : '');

    const onInputChange = (value, setter) => setter(value);

    const onSubmit = (evt) => {
        evt.preventDefault();
        const ok = is.email(email) && (password.trim().length >= PASSWORD_MIN &&
            ((isSignUp && (passwordRepeat === password)) || (!isSignUp)));
        setFormError(ok ? null : errorMessage);
        setTouched(true);
        if (ok) {
            onSuccess({email, password, returnSecureToken: true});
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Typography variant='h6'>{title}</Typography>
            <TextField
                required autoFocus={true} id='email' name='email' label={'email'} value={email} fullWidth
                margin='normal' type={'email'}
                error={touched && !is.email(email)}
                onChange={(evt) => onInputChange(evt.target.value, setEmail)}/>
            <TextField
                required id='password' name='password' label={'пароль'} value={password} fullWidth
                margin='normal' type={'password'}
                error={touched && password.trim().length < PASSWORD_MIN}
                onChange={(evt) => onInputChange(evt.target.value, setPassword)}/>
            {isSignUp &&
            <TextField
                required id='password' name='passwordRepeat' label={'повтор пароля'} value={passwordRepeat} fullWidth
                margin='normal' type={'password'}
                error={touched && (passwordRepeat.trim().length < PASSWORD_MIN || passwordRepeat !== password)}
                onChange={(evt) => onInputChange(evt.target.value, setPasswordRepeat)}/>
            }
            <Button variant={'contained'} color={'primary'} onClick={onSubmit} fullWidth title={'title'}>
                {title}
            </Button>

            <Typography variant={'caption'} color={'error'}>{formError}</Typography>
        </form>
    );
};