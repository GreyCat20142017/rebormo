import React, {useContext} from 'react';
import {RebormoContext} from '../context/rebormo/RebormoContext';
import ErrorMessage from '../appparts/errors/ErrorMessage';

export const ErrorMessageContainer = (props) => {
    const {error, clearError} = useContext(RebormoContext);
    return (
        <ErrorMessage dataError={error} resetError={clearError}/>
    );
};
export default ErrorMessageContainer;