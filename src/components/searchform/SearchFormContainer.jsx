import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return ({
        apiKey: state.data.apiKey,
        exact: state.data.export
    })};

const mapDispatchToProps = (dispatch) => ({
   onSearch: (text) => dispatch()
});

const SearchFormContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchFormContainer;