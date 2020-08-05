import React, {useContext, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {AppBar, Dialog, Typography, Tabs, Tab, Button, useTheme} from '@material-ui/core';

import {DataConfig} from './configparts/DataConfig';
import {CommonConfig} from './configparts/CommonConfig';
import {SoundConfig} from './configparts/SoundConfig';
import {ColorConfig} from './configparts/ColorConfig';
import {OfflineConfig} from './configparts/OfflineConfig';
import {ConfigButtons} from './configparts/ConfigButtons';
import {RebormoContext} from '../../context/rebormo/RebormoContext';
import {ConfigContext} from '../../context/config/ConfigContext';
import {useStyles} from '../config/BormoConfig.css';


export const BormoConfig = withRouter(({history}) => {
    const {instantStart, instantNextMode, countErrorAtPrompt, keyboardModeByDefault} = useContext(ConfigContext);
    const [testStatus] = useState(null);
    const [tab, setTab] = useState(0);
    const {apiKey} = useContext(RebormoContext);
    const theme = useTheme();
    const classes = useStyles(theme);

    const onOptionChange = name => event => {
    };

    const onSelectDataSource = (sourceKey) => {
    };

    const checkAPI = async () => {
    };


    const closeConfig = () => {
        history.goBack();
    };


    const saveConfig = () => {
        history.goBack();
    };


    const onTabChange = (event, newTab) => {
        setTab(newTab);
    };


    return (
        <Dialog fullScreen open={true}>
            <div className={classes.configWrapper}>
                <AppBar position='fixed' color='secondary' className={classes.bar}>
                    <Typography variant='h5' className={classes.configGroup}>Настройка приложения</Typography>
                </AppBar>


                <Tabs className={classes.tabs}
                      value={tab} onChange={onTabChange} indicatorColor='primary' textColor='primary' centered>
                    <Tab label='Общие'/>
                    <Tab label='Цвет, звук'/>
                    <Tab label='Данные'/>
                </Tabs>

                {tab === 0 && <>
                    <CommonConfig classes={classes} onOptionChange={onOptionChange}
                                  instantStart={instantStart} instantNextMode={instantNextMode}
                                  keyboardModeByDefault={keyboardModeByDefault}
                                  countErrorAtPrompt={countErrorAtPrompt}/>
                    <ConfigButtons classes={classes} saveConfig={saveConfig} closeConfig={closeConfig}/>
                </>}

                {tab === 1 && <>
                    <SoundConfig classes={classes}/>
                    <ColorConfig classes={classes}/>
                    <Typography component='p' variant='caption'>
                        *Настройки на этой вкладке применяются сразу
                    </Typography>
                </>}

                {tab === 2 && <>
                    <DataConfig classes={classes} apiKey={apiKey} testStatus={testStatus}
                                checkAPI={checkAPI} onOptionChange={onOptionChange}
                                onSelectDataSource={onSelectDataSource}/>
                    <OfflineConfig/>
                </>
                }

                <Button className={classes.mtb} variant='contained' color='secondary' onClick={closeConfig}
                        title='Вернуться к предыдущему экрану'>Назад</Button>
            </div>

        </Dialog>
    )
});