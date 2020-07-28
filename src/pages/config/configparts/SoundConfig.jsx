import React, {useContext} from 'react';
import {Typography, Paper, FormGroup, FormControlLabel, Button, Switch} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import SimpleSlider from '../../../components/SimpleSlider';
import VoiceContext from '../../../context/voice/VoiceContext';
import Submenu from '../../../components/submenu/Submenu';
import {getRound} from '../../../functions';
import {VOICE_TEST_PHRASE, voiceParams} from '../../../constants';

export const SoundConfig = ({classes}) => {

    const {bormoSpeaker, voices} = useContext(VoiceContext);

    const {onlyEnglish, currentVoice, volume, pitch} = bormoSpeaker.params;


    const onOptionChange = () => {

    };

    const onSliderChange = (name, value) => {
        const newValue = getRound(value, 1);
        if (typeof bormoSpeaker.speaker.ssu[name] !== 'undefined') {
            bormoSpeaker.speaker.ssu[name] = newValue;
        }
        // сохранить;
    };

    const checkVoice = () => {
        bormoSpeaker.speak(VOICE_TEST_PHRASE);
    };

    const onVoiceChange = (voiceName) => {
        const voiceItem = voices.find((item) => item.voice.name === voiceName);
        if (voiceItem) {
            bormoSpeaker.resetVoice(voiceItem.voice);
        }
    };

    const onMuteSwitch = () => {

    }


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

                <Button size='small' variant='contained' color='secondary' onClick={checkVoice}
                        className={classes.configButton}>
                    Тест звука
                    <VolumeUpIcon className={classes.rightIcon} fontSize='small'/>
                </Button>

                <Typography variant='caption'>{currentVoice}</Typography>

                {/*<Select*/}
                {/*    value={currentVoice}*/}
                {/*    onChange={onVoiceChange}*/}
                {/*    inputProps={{*/}
                {/*        name: 'choice'*/}
                {/*    }}*/}
                {/*    title='Выбор синтезатора речи'>*/}
                {/*    {voices.length === 0 ? null : voices.map(el =>*/}
                {/*        <MenuItem className={classes.item} value={el.name} key={el.name}*/}
                {/*                  title={el.name}>{el.name}</MenuItem>*/}
                {/*    )}*/}
                {/*</Select>*/}
                {/*<Button color={'inherit'} title={muted ? 'Включить звук' : 'Отключить звук'}*/}
                {/*        onClick={onMuteSwitch}>*/}
                {/*    <MUIIcon icon={muted ? 'VolumeOn' : 'VolumeOff'}/>*/}
                {/*</Button>*/}
                {/*<Button color={'inherit'} title={'Тест звука'} onClick={checkVoice}>*/}
                {/*    Test*/}
                {/*</Button>*/}
                <Submenu submenuItems={voices} withNavLink={false} callback={onVoiceChange}
                         text={'Выбор голоса из доступных вариантов'} switchIcon={'VoiceSettings'}/>
            </Paper>
        </>
    )
};
