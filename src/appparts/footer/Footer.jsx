import React, {useContext, useState} from 'react';
import {Toolbar, Button, Typography} from '@material-ui/core';

import {DATA_SOURCES, VOICE_TEST_PHRASE} from '../../constants';
import Submenu from '../../components/submenu/Submenu';
import BormoIcon from '../../components/icon/BormoIcon';
import VoiceContext from '../../VoiceContext';

import {useStyles} from '../../App.css';

const dataSources = Object.keys(DATA_SOURCES).filter(key => !DATA_SOURCES[key].disabled).map((item, ind) => (
    {
        text: DATA_SOURCES[item]['COMMENT'],
        key: item,
        href: item
    }
));

const Footer = ({apiKey, onDataSourceChange, onCoursesLoading}) => {
    const {bormoSpeaker} = useContext(VoiceContext);
    const [muted, setMuted] = useState(bormoSpeaker.muted);
    const classes = useStyles();
    const currentDataSource = apiKey && DATA_SOURCES[apiKey] && DATA_SOURCES[apiKey]['COMMENT'] ? DATA_SOURCES[apiKey]['COMMENT'] : '';

    const voices = window.speechSynthesis.getVoices().filter((item) => item.lang.slice(0, 2) === 'en').map(
        el => ({
            voice: el,
            href: el.name,
            key: el.name,
            text: el.name
        })
    );

    const onSelectDataSource = (key) => {
        if (key !== apiKey) {
            onDataSourceChange(key);
            onCoursesLoading(key);
        }
    };

    const onSelectVoice = (voiceName) => {
        const voiceItem = voices.find((item) => item.voice.name === voiceName);
        if (voiceItem) {
            bormoSpeaker.resetVoice(voiceItem.voice);
        }
    };

    const onMuteSwitch = () => {
        const newMuteState = !muted;
        bormoSpeaker.mute(newMuteState);
        setMuted(newMuteState);
    };

    return (
        <Toolbar className={classes.spaceBetween}>
            <div className={classes.paperFlex}>
                <Submenu submenuItems={dataSources} withNavLink={false} callback={onSelectDataSource}
                         switchIcon={'Settings'}/>
                <Typography variant={'caption'}>{currentDataSource}</Typography>
            </div>

            <div className={classes.paperFlex}>
                <Button color={'inherit'} title={muted ? 'Включить звук' : 'Отключить звук'}
                        onClick={onMuteSwitch}>
                    <BormoIcon icon={muted ? 'VolumeOn' : 'VolumeOff'}/>
                </Button>
                <Button color={'inherit'} title={'Тест'} onClick={() => bormoSpeaker.speak(VOICE_TEST_PHRASE)}>
                    Test
                </Button>
                <Submenu submenuItems={voices} withNavLink={false} callback={onSelectVoice}
                         switchIcon={'VoiceSettings'}/>
            </div>
        </Toolbar>
    );

};

export default Footer;