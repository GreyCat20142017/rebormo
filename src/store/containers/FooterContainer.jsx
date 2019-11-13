import {connect} from 'react-redux';
import {changeDataSource, coursesLoading} from '../actions/actions';
import Footer from '../../components/footer/Footer';

const mapStateToProps = (state) => ({
    APIkey: state.config.APIkey
});

const mapDispatchToProps = (dispatch) => ({
    onDataSourceChange: (key) =>  dispatch(changeDataSource(key)),
    onCoursesLoading: (key) => dispatch(coursesLoading(key))
});

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default FooterContainer;