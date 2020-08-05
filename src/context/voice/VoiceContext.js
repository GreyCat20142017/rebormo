import React, {createContext, useEffect, useState} from 'react';
import SpeakerVoice from '../../SpeakerVoice';
import {LS_VOICE, PREFFERABLE_VOICE} from '../../constants';
import {useLsObj} from '../../hooks/hooks';

const VoiceContext = createContext(null);

const getSystemVoices = () => (window['speechSynthesis'] ? window.speechSynthesis.getVoices()
    .filter((item) => item.lang.slice(0, 2) === 'en')
    .map(el => ({voice: el, href: el.name, key: el.name, text: el.name})) : []);

const voiceInitialState = {
    onlyEnglish: true,
    soundMuted: false,
    volume: 1, //0 - 1 step 0.2
    rate: 1,  //0.1 - 10 step 0.1
    pitch: 1, //0 - 2 step 0.1,
    currentVoice: PREFFERABLE_VOICE
};

const initCurrentSpeaker = (voices) => {
    return voices;
};

export const getBormoSpeaker = (voiceParams) => {
    let voices = [];
    const bormoSpeaker = new SpeakerVoice(false, voiceParams);
    if (bormoSpeaker.supportSound) {
        const voices = bormoSpeaker.getVoiceList(initCurrentSpeaker);
        bormoSpeaker.setSpeaker(voices);
        bormoSpeaker.mute(voiceInitialState.soundMuted);
    }
    return {bormoSpeaker, voices};
};

export const VoiceContextProvider = ({children}) => {
    const [voiceParams] = useLsObj(LS_VOICE, voiceInitialState);
    const [{bormoSpeaker}] = useState(getBormoSpeaker(voiceParams));

    const [currentVoice] = useState(voiceParams.currentVoice);
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        setVoices(getSystemVoices());
    }, [setVoices]);

    return (
        <VoiceContext.Provider value={{bormoSpeaker, currentVoice, voices}}>
            {children}
        </VoiceContext.Provider>
    );
};

export default VoiceContext;
