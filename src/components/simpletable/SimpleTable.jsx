import React from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

export const SimpleTable = ({data, columns}) => (
    <Paper style={{padding: '10px'}}>
        <Table aria-label='simple table' size={'small'}>
            <TableHead>
                <TableRow style={{backgroundColor: 'lightgrey'}}>
                    {columns.map((column, ind) => (
                        <TableCell key={ind}>
                            {column}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, rowInd) => (
                    <TableRow key={'row' + rowInd}>
                        {columns.map((column, ind) => (
                                <TableCell key={rowInd + '_' + ind}>
                                    {row[column] ? row[column].toString() : ''}
                                </TableCell>
                            )
                        )}                     
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
);