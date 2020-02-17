import React, {useState} from 'react';
import {Paper, Tab, Tabs, Typography} from '@material-ui/core';
import {EXCLUDED_COLUMNS} from '../../../constants';
import {MUITable} from '../../muitable/MUITable';

const getTableStructure = (cell, excludedColumns) => (
    Object.keys(cell).filter(item => !(excludedColumns.indexOf(item) !== -1))
);

const SkyResultTabs = ({classes, skyData}) => {
    const [value, setValue] = useState(0);

    const onValueChange = (evt, value) => {
        setValue(value);
    };

    const meaningsColumns = skyData['meanings'] && skyData['meanings'].length > 0 ?
        getTableStructure(skyData['meanings'][0], EXCLUDED_COLUMNS) : [];
    const phrasesColumns = skyData['phrases'] && skyData['phrases'].length > 0 ?
        getTableStructure(skyData['phrases'][0], [...EXCLUDED_COLUMNS, 'translationNote']) : [];

    return (
        skyData ?
            <>
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={onValueChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered>
                        <Tab label="Перевод"/>
                        <Tab label="Примеры"/>
                    </Tabs>
                </Paper>
                {value === 0 && <MUITable data={skyData['meanings'] || []} columns={meaningsColumns}/>}
                {value === 1 && <MUITable data={skyData['phrases'] || []} columns={phrasesColumns}/>}
            </> :
            <Typography variant={'caption'}>Что-то пошло не так...</Typography>
    );
};


export default SkyResultTabs;
