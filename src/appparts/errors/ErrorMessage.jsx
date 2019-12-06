import React, {useEffect, useState} from 'react';
import SimpleSnackbar from '../../components/snackbar/SimpleSnackbar';

const ErrorMessage = ({dataError, resetError}) => {
   const  [message, setMessage] = useState(null);
    useEffect(() => {
        if (dataError) {
            setMessage(dataError);
        }
    }, [dataError]);

    const onSnackClose = (event, reason) => {
        if (reason && (reason === 'clickaway')) {
            return;
        }
        setMessage(null);
        resetError();
    };

    return (
        <>
            <SimpleSnackbar open={!!(message)} message={message} onSnackClose={onSnackClose}/>
        </>
    );
};

export default ErrorMessage;