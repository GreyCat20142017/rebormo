import React, {createContext, useState} from 'react';
import SpeakerVoice from '../../SpeakerVoice';


const VoiceContext = createContext(null);

const voiceInitialState = {
    onlyEnglish: true,
    soundMuted: false,
    volume: 1, //0 - 1 step 0.2
    rate: 1,  //0.1 - 10 step 0.1
    pitch: 1 //0 - 2 step 0.1
};

const initCurrentSpeaker = (voices) => {
    return voices;
};

export const getBormoSpeaker = () => {
    const bormoSpeaker = new SpeakerVoice(false, voiceInitialState);
    if (bormoSpeaker.supportSound) {
        const voices = bormoSpeaker.getVoiceList(initCurrentSpeaker);
        bormoSpeaker.setSpeaker(voices);
        bormoSpeaker.mute(voiceInitialState.soundMuted);
    }
    return bormoSpeaker;
};

export const VoiceContextProvider = ({children}) => {
    const [bormoSpeaker] = useState(getBormoSpeaker());
    return (
        <VoiceContext.Provider value={{bormoSpeaker}}>
            {children}
        </VoiceContext.Provider>
    );
};

export default VoiceContext;
