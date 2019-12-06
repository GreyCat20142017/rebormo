import {connect} from 'react-redux';
import ErrorMessage from '../../appparts/errors/ErrorMessage';
import {loadingError} from '../actions/dataActions';

const mapStateToProps = (state) => ({
    dataError: state.data.error
});

const mapDispatchToProps = (dispatch) => ({
    resetError: () => dispatch(loadingError(null))
});

const ErrorMessageContainer = connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);

export default ErrorMessageContainer;