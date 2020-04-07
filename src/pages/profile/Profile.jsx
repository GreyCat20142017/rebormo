import React, {useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Tab, Tabs, Typography} from '@material-ui/core';

import {SimpleTable} from '../../components/components';
import {TabPanel} from './TabPanel';
import {ProfileForm} from './ProfileForm';
import {UserContext} from '../../context/user/UserContext';
import {ROUTES} from '../../routes';

const ProfileInfo = ({info}) => {
    const data = info ? Object.keys(info).map(key => ({field: key, fieldValue: info[key]})) : [];
    return (
        <SimpleTable data={data} columns={['field', 'fieldValue']}/>
    );
};

export const Profile = (props) => {
    const [value, setValue] = useState(0);
    const [{currentUser, isLoggedIn}] = useContext(UserContext);

    const onTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const currentInfo = currentUser ? currentUser : [];

    return (
        <>
            {currentUser ?
            <>
                <Typography></Typography>
                <Tabs value={value} onChange={onTabChange} aria-label="simple tabs example">
                    <Tab label='Просмотр профиля'/>
                    <Tab label='Редактирование профиля'/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Typography variant={'subtitle1'}>Информация о текущем пользователе</Typography>
                    {currentUser && <ProfileInfo info={currentInfo}/>}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ProfileForm info={currentInfo}/>
                </TabPanel>
                <Typography variant={'caption'}>{isLoggedIn ? 'Вход выполнен' : 'Вход не выполнен'}</Typography>
            </> :
                <Redirect to={ROUTES.main.href}/>
            }
        </>
    );
};
