import React from 'react';

import {InfoPart} from '../control/InfoPart';
import {SpellingForm} from './SpellingForm';
import SimpleToolbar from '../../components/toolbar/SimpleToolbar';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';
import {TOOLBAR_TYPES} from '../../constants';
import {useHotkey} from '../../hooks/hooks';

const SpellingView = ({
                          classes, content, currentLesson, currentCourse,
                          currentTranslate, okCount, errorCount, showHint, setShowHint,
                          onSkip, onHint, onRestart, onTranslateValidate
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

                {(okCount === content.length) ?
                    <SimpleToolbar toolbar={TOOLBAR_TYPES.SPELLING_STOPPED} className={classes.toolbar}
                                   onRestart={onRestart}/>
                    :
                    <>
                        <SpellingForm classes={classes} currentTranslate={currentTranslate}
                                      showHint={showHint} setShowHint={setShowHint}
                                      onTranslateValidate={onTranslateValidate}/>

                        <SimpleToolbar toolbar={TOOLBAR_TYPES.SPELLING_STARTED} className={classes.toolbar}
                                       onSkip={onSkip}
                                       onHint={onHint}/>
                    </>
                }

            </div>
            :
            <ContentMissingMessage/>
    );
};

export default SpellingView;