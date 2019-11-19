import {connect} from 'react-redux';
import {switchSidenavState} from '../actions/actions';
import Body from '../../components/body/Body';

const mapStateToProps = (state) => ({
    isSideNavOpen: state.ui.isSideNavOpen,
    content: state.common.content,
    APIkey: state.config.APIkey
});

const mapDispatchToProps = (dispatch) => ({
    switchSidenav: (sidenavState) =>  dispatch(switchSidenavState(sidenavState))
});

const BodyContainer = connect(mapStateToProps, mapDispatchToProps)(Body);

export default BodyContainer;