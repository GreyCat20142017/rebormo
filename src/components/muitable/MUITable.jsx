import React, {useContext, useEffect, useState} from 'react';
import {
    ButtonBase,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';

import ActionsHeaders from './actions/ActionsHeaders';
import ActionsCells from './actions/ActionsCells';
import MUIIcon from '../icon/MUIIcon';
import {UIContext} from '../../context/ui/UIContext';
import {useStyles} from './MUITable.css';
import {isSelected} from '../../functions';

const getDisabled = (data, rowInd, actionsDisable) => {
    const result = {disabledActions: [], disabledCondition: false};
    if (data && actionsDisable && actionsDisable['disabledCondition']) {
        const fieldName = actionsDisable.disabledCondition['fieldName'];
        const fieldCondition = actionsDisable.disabledCondition['condition'];
        const fieldValue = data[rowInd][fieldName];
        result.disabledCondition = fieldName && fieldValue && fieldCondition ? (fieldValue === fieldCondition) : false;
        result.disabledActions = [...actionsDisable['disabledActions']];
    }
    return result;
};

const getCell = (row, column, rowIndex) => (row[column] || (column === 'id' ? rowIndex + 1 : ''));

const getHoverTitle = (row, hoverField) => (
    hoverField && row[hoverField] ? hoverField + ' : ' + row[hoverField] : ''
);

/**
 * @param actions = {'delete: {'title' : 'удалить',  icon: 'Delete', callback: something}}
 */

export const MUITable = ({
                             data, columns, rowsLimit = 10, size = 'small', maxWidth = '100%',
                             hoverField = null, actions = null,
                             tableTitle = null, actionsDisable = null, forceFirst = true,
                             withCheckbox = false, SelectedViewer = null
                         }) => {
    const classes = useStyles(maxWidth);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsLimit);
    const {lastPage, setLastPage} = useContext(UIContext);

    const totalPages = data ? Math.ceil(data.length / rowsLimit) : 0;

    const startPage = ((lastPage >= totalPages) || forceFirst) ? 0 : lastPage;

    useEffect(() => {
        setPage(startPage);
    }, [startPage]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if (!forceFirst) {
            setLastPage(newPage);
        }
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        if (!forceFirst) {
            setLastPage(0);
        }
    };

    const onSelectAllClick = () => {
        const needSelect = !(selected.length === data.length);
        const newState = needSelect ? Array(data.length).fill('item').map((el, ind) => ind) : [];
        setSelected(newState);
    };

    const onCheck = (ind) => {
        const newState = selected.indexOf(ind) !== -1 ?
            selected.filter(el => (el !== ind)) :
            [...selected, ind];
        setSelected(newState);
    };

    return (

        <div style={{maxWidth: maxWidth}}>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper} style={{overflowX: 'auto'}}>

                    <Typography variant='h6' color={'textPrimary'}>{tableTitle}</Typography>

                    <Table stickyHeader aria-label="таблица" size={size}>
                        <TableHead>
                            <TableRow>
                                {withCheckbox &&
                                <TableCell>
                                    <ButtonBase focusRipple={true} onClick={onSelectAllClick}
                                                title={selected.length === data.length ? 'снять все отметки' : 'Выбрать все'}>
                                        <MUIIcon icon={selected.length === data.length ? 'ClearAll' : 'Reverse'}/>
                                    </ButtonBase>
                                </TableCell>
                                }
                                <ActionsHeaders actions={actions}/>
                                {columns.map((column, ind) => (
                                    <TableCell key={ind}>
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowInd) =>
                                (
                                    <TableRow key={rowInd} title={getHoverTitle(row, hoverField)}>
                                        {withCheckbox &&
                                        <TableCell padding="checkbox">
                                            <Checkbox onChange={() => onCheck(rowInd + rowsPerPage * page)}
                                                      checked={isSelected(selected, rowInd + rowsPerPage * page)}
                                            />
                                        </TableCell>
                                        }
                                        {actions &&
                                        <ActionsCells actions={actions} rowInd={rowInd + rowsPerPage * page}
                                                      {...getDisabled(data, rowInd + rowsPerPage * page, actionsDisable)}
                                        />}
                                        {columns.map((column, ind) => (
                                                <TableCell key={rowInd + '_' + ind}>
                                                    {getCell(row, column, rowInd + rowsPerPage * page)}
                                                </TableCell>
                                            )
                                        )}

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

                    <TablePagination className={classes.selectRoot} size={'small'}
                                     rowsPerPageOptions={[5, 10, 15]}
                                     labelRowsPerPage={''}
                                     component="div"
                                     count={data.length}
                                     rowsPerPage={rowsPerPage}
                                     page={page}
                                     onChangePage={handleChangePage}
                                     onChangeRowsPerPage={handleChangeRowsPerPage}/>
                </div>
                {SelectedViewer && <SelectedViewer data={data} selected={selected}/>}
            </Paper>
        </div>
    );
};