import React from 'react';
import {CONTROL_MODES, FIELDS, WORDS_PER_LESSON} from '../../constants';
import {getCurrentInfo} from '../../functions';
import ListPart from '../bormo/ListPart';
import {TopPart} from './TopPart';

import {useControlModeStyles} from '../../App.css';

const Control = ({
                     currentLesson = 1, currentCourse = 1, controlMode = CONTROL_MODES.CONTROL,
                     content = [{
                         english: 'test',
                         russian: 'тест'
                     }], currentIndex = 0, randomOrder = [0], memorized = [],
                     errorCount = 0, okCount = 0, showHint = false
                 }) => {
    const classes  = useControlModeStyles();

    const maxIndex = content ? content.length : 0;
    const currentTranslate = showHint ?
        getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.ORIGIN) :
        getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.TRANSLATE);

    const onDebouncedSwitch = () => {

    };

    return (
        (content && content.length > 0) ?
            <div>
                <TopPart classes={classes} content={content} currentCourse={currentCourse} currentLesson={currentLesson}
                         okCount={okCount} errorCount={errorCount} currentTranslate={currentTranslate}
                         isHint={showHint}/>

                <div className={classes.parts}>
                    <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}
                              memorized={memorized} switchDisableOne={onDebouncedSwitch}
                              controlMode={controlMode}/>

                    <ListPart content={content} classes={classes} currentIndex={currentIndex}
                              startIndex={Math.floor(WORDS_PER_LESSON / 2)} memorized={memorized}
                              switchDisableOne={onDebouncedSwitch} controlMode={controlMode}/>
                </div>

            </div> :
            null
    );
};

export default Control;