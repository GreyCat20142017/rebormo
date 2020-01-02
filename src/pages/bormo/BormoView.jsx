import React from 'react';

import ListPart from './ListPart';
import BasePart from './BasePart';
import {WORDS_PER_LESSON} from '../../constants';

const secondStartIndex = Math.floor(WORDS_PER_LESSON / 2);

export const BormoView = ({
                              classes, content, currentIndex, currentWord, currentTranslate,
                              memorized, activeAmount, timerStatus, timerStart, timerPause, timerStop,
                              onDebouncedSwitch
                          }) => (
    <div className='bormo__wrapper'>
        <div className={classes.parts}>

            <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}
                      memorized={memorized} switchDisableOne={onDebouncedSwitch}/>

            <BasePart classes={classes} currentWord={currentWord} currentTranslate={currentTranslate}
                      activeAmount={activeAmount} timerStatus={timerStatus} content={content}
                      onDebouncedSwitch={onDebouncedSwitch}
                      timerStart={timerStart} timerPause={timerPause} timerStop={timerStop}/>

            <ListPart content={content} classes={classes} currentIndex={currentIndex}
                      startIndex={secondStartIndex} memorized={memorized}
                      switchDisableOne={onDebouncedSwitch}/>

        </div>
    </div>
);