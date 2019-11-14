import {connect} from 'react-redux';
import {switchSidenavState} from '../actions/actions';
import Main from '../../components/main/Main';

const mapStateToProps = (state) => ({
    isSideNavOpen: state.ui.isSideNavOpen
});

const mapDispatchToProps = (dispatch) => ({
    switchSidenav: (sidenavState) =>  dispatch(switchSidenavState(sidenavState)),
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;