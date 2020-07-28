import React, {useContext, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {AppBar, Dialog, Typography, Divider, useTheme} from '@material-ui/core';

import {DataConfig} from './configparts/DataConfig';
import {CommonConfig} from './configparts/CommonConfig';
import {SoundConfig} from './configparts/SoundConfig';
import {ColorConfig} from './configparts/ColorConfig';
import {ConfigButtons} from './configparts/ConfigButtons';
import {RebormoContext} from '../../context/rebormo/RebormoContext';
import {ConfigContext} from '../../context/config/ConfigContext';
import {useStyles} from '../config/BormoConfig.css';

export const BormoConfig = withRouter(({history}) => {
    const {instantStart, instantNextMode, countErrorAtPrompt, keyboardModeByDefault} = useContext(ConfigContext);
    const [testStatus] = useState(null);
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

    return (
        <Dialog fullScreen open={true}>
            <div className={classes.configWrapper}>
                <AppBar position="fixed" color="secondary" className={classes.bar}>
                    <Typography variant='h5' className={classes.configGroup}>Настройка приложения</Typography>
                </AppBar>

                <CommonConfig classes={classes} onOptionChange={onOptionChange}
                              instantStart={instantStart} instantNextMode={instantNextMode}
                              keyboardModeByDefault={keyboardModeByDefault}
                              countErrorAtPrompt={countErrorAtPrompt}/>

                <DataConfig classes={classes} apiKey={apiKey} testStatus={testStatus}
                            checkAPI={checkAPI} onOptionChange={onOptionChange}
                            onSelectDataSource={onSelectDataSource}/>

                <ConfigButtons classes={classes} saveConfig={saveConfig} closeConfig={closeConfig}/>

                <Divider/>

                <SoundConfig classes={classes}/>

                <ColorConfig classes={classes}/>


            </div>
        </Dialog>
    )
});