import React, {createContext, useState} from 'react';
import SpeakerVoice from '../../SpeakerVoice';
import {PREFFERABLE_VOICE} from '../../constants';


const VoiceContext = createContext(null);

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

export const getBormoSpeaker = () => {
    let voices = [];
    const bormoSpeaker = new SpeakerVoice(false, voiceInitialState);
    if (bormoSpeaker.supportSound) {
        const voices = bormoSpeaker.getVoiceList(initCurrentSpeaker);
        bormoSpeaker.setSpeaker(voices);
        bormoSpeaker.mute(voiceInitialState.soundMuted);
    }
    return {bormoSpeaker, voices};
};

export const VoiceContextProvider = ({children}) => {
    const [{bormoSpeaker, voices}] = useState(getBormoSpeaker());
    const [currentVoice] = useState(voiceInitialState.currentVoice);
    return (
        <VoiceContext.Provider value={{bormoSpeaker, currentVoice, voices}}>
            {children}
        </VoiceContext.Provider>
    );
};

export default VoiceContext;
