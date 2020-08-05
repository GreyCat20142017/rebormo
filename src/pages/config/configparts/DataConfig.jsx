import React from 'react';

import {Typography, Paper, FormGroup, Button} from '@material-ui/core';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import DataSourceSelector from '../../../components/DataSourceSelector';

export const DataConfig = ({classes, APIkey, testStatus, checkAPI, onSelectDataSource}) => (
  <>
    <Typography variant='caption' className={classes.configGroup}>Источник данных</Typography>
    <Paper className={classes.configPaper}>
      <FormGroup className={classes.configGroup}>
        <div className={classes.flex}>
          <Button size='small' variant='outlined' onClick={checkAPI}
                  className={classes.configButton}>
            Тест API
            <ImportExportIcon className={classes.rightIcon} fontSize='small'/>
          </Button>
          <DataSourceSelector onSelectDataSource={onSelectDataSource} current={APIkey}/>
        </div>
        <Typography variant='body2' color='primary' className={classes.text}>Статус: {testStatus}</Typography>
      </FormGroup>
    </Paper>
  </>
);
