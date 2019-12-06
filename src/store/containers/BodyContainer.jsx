import {connect} from 'react-redux';
import {switchSidenavState} from '../actions/actions';
import Body from '../../appparts/body/Body';

const mapStateToProps = (state) => ({
    isSideNavOpen: state.ui.isSideNavOpen,
    content: state.data.content,
    apiKey: state.config.apiKey
});

const mapDispatchToProps = (dispatch) => ({
    switchSidenav: (sidenavState) =>  dispatch(switchSidenavState(sidenavState))
});

const BodyContainer = connect(mapStateToProps, mapDispatchToProps)(Body);

export default BodyContainer;