import React, {useContext, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {RebormoContext} from '../context/rebormo/RebormoContext';
import {UIContext} from '../context/ui/UIContext';
import Body from '../appparts/body/Body';
import {BORMO_MODES, ROUTES} from '../routes';
import {useHotkeys} from '../hooks/hooks';
import {HOTKEYS} from '../constants';

const BodyContainer = ({classes, history}) => {
    const {isBormo, changeIsBormo, apiKey, currentCourse, currentLesson, content} = useContext(RebormoContext);
    const {sidenav, sidenavSwitch} = useContext(UIContext);
    const {nextLesson, prevLesson} = useContext(RebormoContext);

    useEffect(() => {
        history.listen((location) => {
            if (location.pathname === ROUTES.phrases.href) {
                changeIsBormo(false);
            }
            if (BORMO_MODES.find(el => location.pathname === el.href)) {
                changeIsBormo(true);
            }
        });
        return () => {
            if (history && history['unlisten']) {
                history.unlisten();
            }
        };
    }, [changeIsBormo, history]);

    useHotkeys({[HOTKEYS.N]: nextLesson, [HOTKEYS.P]: prevLesson});

    const bodyProps = {isBormo, changeIsBormo, apiKey, currentCourse, currentLesson, originalContent: content, sidenav, sidenavSwitch};
    return (
        <Body classes={classes} {...bodyProps}/>
    );
};

export default withRouter(BodyContainer);