import React from 'react';
import {ControlTopPart} from './ControlTopPart';
import ListPart from '../bormo/ListPart';
import {WORDS_PER_LESSON} from '../../constants';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';

const ControlView = ({
                         classes, content, currentLesson, currentCourse, controlMode,
                         currentIndex, memorized, currentTranslate, maxIndex,
                         okCount, errorCount, showHint = false,
                         onDebouncedSwitch
                     }) => {

    return (

        (content && content.length > 0) ?
            <div>
                <ControlTopPart classes={classes} content={content} currentCourse={currentCourse}
                                currentLesson={currentLesson}
                                okCount={okCount} errorCount={errorCount} currentTranslate={currentTranslate}
                                isHint={showHint}/>

                <div className={classes.parts}>
                    <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}
                              memorized={memorized} switchDisableOne={onDebouncedSwitch}
                              controlMode={controlMode} isControlMode={true}/>

                    <ListPart content={content} classes={classes} currentIndex={currentIndex}
                              startIndex={Math.floor(WORDS_PER_LESSON / 2)} memorized={memorized}
                              switchDisableOne={onDebouncedSwitch} controlMode={controlMode}
                              isControlMode={true}/>
                </div>

            </div> :
            <ContentMissingMessage/>
    );
};

export default ControlView;