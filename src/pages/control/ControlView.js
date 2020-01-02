import React from 'react';
import {InfoPart} from './InfoPart';
import ListPart from '../bormo/ListPart';
import {WORDS_PER_LESSON} from '../../constants';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';
import {useHotkey} from '../../hooks/hooks';

const ControlView = ({
                         classes, content, currentLesson, currentCourse, controlMode,
                         currentIndex, memorized, currentTranslate,
                         okCount, errorCount, showHint = false,
                         onDebouncedSwitch, onSkip, onHint
                     }) => {

    useHotkey(['s'], onSkip);
    useHotkey(['h'], onHint);

    return (

        (content && content.length > 0) ?
            <div>
                <InfoPart classes={classes} content={content} currentCourse={currentCourse}
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