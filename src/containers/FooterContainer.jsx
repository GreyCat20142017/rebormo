// import {connect} from 'react-redux';
// import {changeDataSource, coursesLoading} from '../actions/actions';
// import Footer from '../../appparts/footer/Footer';
//
// const mapStateToProps = (state) => ({
//     apiKey: state.data.apiKey,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     onDataSourceChange: (key) =>  dispatch(changeDataSource(key)),
//     onCoursesLoading: (key) => {
//         dispatch(coursesLoading(key, true));
//         dispatch(coursesLoading(key, false));
//     },
// });
//
// const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);
//
// export default FooterContainer;


import React, {useContext} from 'react';
import Footer from '../appparts/footer/Footer';
import {RebormoContext} from '../context/rebormo/RebormoContext';

const FooterContainer = (props) => {
    const {apiKey, changeDataSource, getData} = useContext(RebormoContext);

    const footerProps = {apiKey, changeDataSource, getData}
    return (
        <Footer {...footerProps}/>
    );
};

export default  FooterContainer;