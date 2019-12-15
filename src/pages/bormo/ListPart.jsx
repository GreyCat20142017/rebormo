import React from 'react';
import classNames from 'classnames';
import {Hidden, Paper, Typography, Tooltip} from '@material-ui/core';

import {isInactive} from '../../functions';
import {FIELDS, WORDS_PER_LESSON} from '../../constants';

const ListPart = ({content, classes, currentIndex, startIndex, memorized, switchDisableOne, isControlMode = false}) => (
    <Hidden mdDown>
        <ul className={classNames(classes.part, classes.cardList)}>
            {content.slice(startIndex, startIndex + Math.floor(WORDS_PER_LESSON / 2)).map((item, ind) =>
                <li className={classes.cardItem} key={ind + startIndex}>
                    <Paper
                        className={classNames(classes.card, isInactive(ind + startIndex, memorized) ? classes.colorized : null)}>
                        <Tooltip className={classes.tooltip}
                                 title={isControlMode ? '' : 'Перевод: "' + item['russian'] + '"'}>
                            <Typography className={classes.title} variant='h6'
                                        color={isControlMode || ((ind + startIndex) !== currentIndex) ? 'secondary' : 'error'}
                                        onClick={() => switchDisableOne(ind + startIndex)}>
                                {isControlMode ? item[FIELDS.ORIGIN] : item['english']}
                            </Typography>
                        </Tooltip>
                    </Paper>
                </li>
            )}
        </ul>
    </Hidden>
);

export default ListPart;



