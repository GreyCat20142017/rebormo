import React from 'react';

import {
    Headset, Done, DoneAll, PlaylistAddCheck as Spelling, ListAlt as Check,
    Home, Settings, Search, CloudQueue as Sky, Info, Extension, FilterNone, Add, Edit,
    MoreVert as More, HelpOutline as Help, MenuBook as Book, PriorityHigh as Error, Menu,
    ArrowLeft, ArrowRight, VolumeOff, VolumeDown as VolumeOn, PermDataSetting as VoiceSettings,
    Person as User, Face as LoggedUser
} from '@material-ui/icons';


const MUIIcon = ({icon, iconSize = 'small', color = 'inherit'}) => {
    switch (icon) {
        case 'Menu':
            return <Menu fontSize={iconSize} color={color}/>;
        case 'Bormo':
            return <Headset fontSize={iconSize} color={color}/>;
        case 'Control':
            return <Done fontSize={iconSize} color={color}/>;
        case 'Reverse':
            return <DoneAll fontSize={iconSize} color={color}/>;
        case 'Spelling':
            return <Spelling fontSize={iconSize} color={color}/>;
        case 'Check':
            return <Check fontSize={iconSize} color={color}/>;
        case 'Home':
            return <Home fontSize={iconSize} color={color}/>;
        case 'Settings':
            return <Settings fontSize={iconSize} color={color}/>;
        case 'Search':
            return <Search fontSize={iconSize} color={color}/>;
        case 'Sky':
            return <Sky fontSize={iconSize} color={color}/>;
        case 'ClearAll':
            return <FilterNone fontSize={iconSize} color={color}/>;
        case 'Info':
            return <Info fontSize={iconSize} color={color}/>;
        case 'More':
            return <More fontSize={iconSize} color={color}/>;
        case 'Help':
            return <Help fontSize={iconSize} color={color}/>;
        case 'Book':
            return <Book fontSize={iconSize} color={color}/>;
        case 'Error':
            return <Error fontSize={iconSize} color={color}/>;
        case 'Extension':
            return <Extension fontSize={iconSize} color={color}/>;
        case 'Prev':
            return <ArrowLeft fontSize={iconSize} color={color}/>;
        case 'Next':
            return <ArrowRight fontSize={iconSize} color={color}/>;
        case 'VoiceSettings':
            return <VoiceSettings fontSize={iconSize} color={color}/>;
        case 'VolumeOn':
            return <VolumeOn fontSize={iconSize} color={color}/>;
        case 'VolumeOff':
            return <VolumeOff fontSize={iconSize} color={color}/>;
        case 'Add':
            return <Add fontSize={iconSize} color={color}/>;
        case 'Edit':
            return <Edit fontSize={iconSize} color={color}/>;
        case 'User':
            return <User fontSize={iconSize} color={color}/>;
        case 'LoggedUser':
            return <LoggedUser fontSize={iconSize} color={color}/>;
        default:
    }
    return null;
};

export default MUIIcon;