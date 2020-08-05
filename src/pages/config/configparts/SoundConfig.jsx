import React, {useContext, useState} from 'react';
import {Typography, Paper, FormGroup, FormControlLabel, Button, Switch} from '@material-ui/core';

import SimpleSlider from '../../../components/SimpleSlider';
import VoiceContext from '../../../context/voice/VoiceContext';
import Submenu from '../../../components/submenu/Submenu';
import MUIIcon from '../../../components/icon/MUIIcon';
import {useLsObj} from '../../../hooks/hooks';
import {getRound} from '../../../functions';
import {LS_VOICE, VOICE_TEST_PHRASE, voiceParams} from '../../../constants';

export const SoundConfig = ({classes}) => {

    const {bormoSpeaker, voices} = useContext(VoiceContext);
    const [, setVoiceParams] = useLsObj(LS_VOICE);

    const {onlyEnglish, currentVoice, volume, pitch, soundMuted} = bormoSpeaker.params;

    const [muted, setMuted] = useState(soundMuted);
    const [current, setCurrent] = useState(currentVoice);

    const onOptionChange = (optionName) => {

    };

    const onSliderChange = (name, value) => {
        const newValue = getRound(value, 1);
        if (typeof bormoSpeaker.speaker.ssu[name] !== 'undefined') {
            bormoSpeaker.speaker.ssu[name] = newValue;
        }
        const params = {...bormoSpeaker.params, [name]: value};
        bormoSpeaker.resetParams(bormoSpeaker.speaker.ssu, params);
        setVoiceParams(params);

    };

    const checkVoice = () => {
        bormoSpeaker.speak(VOICE_TEST_PHRASE);
    };

    const onVoiceChange = (voiceName) => {
        const voiceItem = voices.find((item) => item.voice.name === voiceName);
        if (voiceItem) {
            bormoSpeaker.resetVoice(voiceItem.voice);
            setCurrent(voiceName);
            setVoiceParams({...bormoSpeaker.params, currentVoice: voiceName});
        }
    };

    const onMuteSwitch = () => {
        const newMuted = !muted;
        bormoSpeaker.mute(newMuted);
        setMuted(newMuted);
        setVoiceParams({...bormoSpeaker.params, soundMuted: newMuted});
    };

    return (
        <>
            <Typography variant='caption' className={classes.configGroup}>Параметры звука</Typography>
            <Paper className={classes.configPaper}>
                <FormGroup className={classes.configGroup}>
                    <Typography variant="subtitle1">{bormoSpeaker.getVoiceSupport()}</Typography>
                    <div className={classes.flex}>

                        <FormControlLabel
                            control={<Switch checked={false} onChange={onMuteSwitch}
                                             value={false}
                                             color='primary'/>}
                            label='беззвучный режим'/>

                        <FormControlLabel
                            control={<Switch checked={onlyEnglish} onChange={onOptionChange('onlyEnglish')}
                                             value='onlyEnglish' color='primary' disabled={true}/>}
                            label='озвучивать только английский'/>
                    </div>

                    <SimpleSlider name='volume' params={voiceParams.volume} sliderValue={volume}
                                  onSliderChange={onSliderChange}/>

                    <Typography variant='caption' className={classes.configGroup}>Чем больше значение параметра, тем
                        писклявей звук.
                        Норма: 1 </Typography>
                    <SimpleSlider name='pitch' params={voiceParams.pitch} sliderValue={pitch}
                                  onSliderChange={onSliderChange}/>

                </FormGroup>

                <Submenu submenuItems={voices} withNavLink={false} callback={onVoiceChange}
                         text={'Выбор голоса из доступных вариантов'} switchIcon={'VoiceSettings'}/>
                <Button size='small' variant='outlined' onClick={checkVoice}
                        className={classes.configButton} disabled={muted}>
                    Тест звука
                </Button>
                <Typography variant='caption'>{current}: {muted ? 'выключен' : 'включен'}</Typography>
                <Button color={'inherit'} title={muted ? 'Включить звук' : 'Отключить звук'}
                        onClick={onMuteSwitch}>
                    <MUIIcon icon={muted ? 'VolumeOn' : 'VolumeOff'}/>
                </Button>


            </Paper>
        </>
    )
};
