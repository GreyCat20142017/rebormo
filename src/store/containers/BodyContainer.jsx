import {connect} from 'react-redux';
import {switchSidenavState, changeIsBormo} from '../actions/actions';
import Body from '../../appparts/body/Body';

const mapStateToProps = (state) => ({
    isSideNavOpen: state.ui.isSideNavOpen,
    content: state.data.content,
    apiKey: state.config.apiKey,
    currentCourse: state.data.currentCourse,
    currentLesson: state.data.currentLesson,
    isIntersecting: state.data.isBormo
});

const mapDispatchToProps = (dispatch) => ({
    switchSidenav: (sidenavState) =>  dispatch(switchSidenavState(sidenavState)),
    changeIsBormo: (isBormo) => dispatch(changeIsBormo(isBormo))
});

const BodyContainer = connect(mapStateToProps, mapDispatchToProps)(Body);

export default BodyContainer;