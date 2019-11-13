import React from 'react';

export const getInlineSvg = (name, width = 20, height = 20, fillColor = 'white', strokeColor = 'white') => {
    switch (name) {

        case 'filter':
            return (
                <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width={width} height={height}
                     fill={fillColor} stroke={strokeColor}>
                    <path
                        d="M8.7 7.7c-.4.3-.7 3.4-.7 6.7v6.1l8.3 8.5c4.6 4.7 14.3 15 21.7 23 7.4 8 14.9 16 16.6 17.7l3.1 3.3h32.6l3.1-3.3C95.1 68 102.6 60 110 52c7.4-7.9 17.2-18.3 21.7-23l8.3-8.5-.3-6.5-.2-6.5-65.1-.3c-35.8-.1-65.4.1-65.7.5zM56.7 79.6c-.4.4-.7 10.9-.7 23.4v22.7l16.2 9.7c8.8 5.3 16.8 9.5 17.7 9.4 1.4-.3 1.6-3.9 1.6-32.8V79.5l-17.1-.3c-9.3-.1-17.3.1-17.7.4z"/>
                </svg>
            );

        case 'main':
            return (
                <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}
                     fill={fillColor} stroke={strokeColor}>
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
            );

        case 'drawer':
            return (
                <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}
                     fill={fillColor} stroke={strokeColor}>
                    <path
                        d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4zm5 9h4v-4h-4v4zM3 19h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zm5 0h4v-4h-4v4zm0-14v4h4V5h-4z"/>
                </svg>
            );

        case 'config':
            return (
                <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}
                     fill={fillColor} stroke={strokeColor}>
                    <path
                        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"/>
                </svg>
            );

        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" id="default" viewBox="0 0 17 13" width={width} height={height}
                     fill={fillColor} stroke={fillColor}></svg>);
    }
};

