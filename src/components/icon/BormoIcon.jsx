import React from 'react';

import {
    Headset, Done, DoneAll, PlaylistAddCheck as Spelling, ListAlt as Check,
    Home, Settings, Search, CloudQueue as Sky, Info, Extension,
    MoreVert as More, HelpOutline as Help, MenuBook as Book, PriorityHigh as Error, Menu,
    ArrowLeft, ArrowRight
} from '@material-ui/icons';


const BormoIcon = ({icon, iconSize = 'small'}) => {
    switch (icon) {
        case 'Menu':
            return <Menu fontSize={iconSize}/>;
        case 'Bormo':
            return <Headset fontSize={iconSize}/>;
        case 'Control':
            return <Done fontSize={iconSize}/>;
        case 'Reverse':
            return <DoneAll fontSize={iconSize}/>;
        case 'Spelling':
            return <Spelling fontSize={iconSize}/>;
        case 'Check':
            return <Check fontSize={iconSize}/>;
        case 'Home':
            return <Home fontSize={iconSize}/>;
        case 'Settings':
            return <Settings fontSize={iconSize}/>;
        case 'Search':
            return <Search fontSize={iconSize}/>;
        case 'Sky':
            return <Sky fontSize={iconSize}/>;
        case 'Info':
            return <Info fontSize={iconSize}/>;
        case 'More':
            return <More fontSize={iconSize}/>;
        case 'Help':
            return <Help fontSize={iconSize}/>;
        case 'Book':
            return <Book fontSize={iconSize}/>;
        case 'Error':
            return <Error fontSize={iconSize}/>;
        case 'Extension':
            return <Extension fontSize={iconSize}/>;
        case 'Prev':
            return <ArrowLeft fontSize={iconSize}/>;
        case 'Next':
            return <ArrowRight fontSize={iconSize}/>;
        default:
    }
    return null;
};

export default BormoIcon;