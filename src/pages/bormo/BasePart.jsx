import React from 'react';
import {BormoControls, BormoCurrentWord} from './BasePartComponents';
import ContentMissingMessage from '../../appparts/errors/ContentMissingMessage';

const BasePart = (props) => (

    <div className={props.classes.part}>
        {props.content && props.content.length > 0 ?
            <>
                <BormoCurrentWord classes={props.classes} activeAmount={props.activeAmount}
                                  currentWord={props.currentWord} currentTranslate={props.currentTranslate}/>
                <BormoControls {...props}/>

            </> :
            <ContentMissingMessage/>
        }
    </div>
);

export default BasePart;