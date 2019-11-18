import {connect} from 'react-redux';
import {switchSidenavState} from '../actions/actions';
import Header from '../../components/header/Header';

const mapStateToProps = (state) => ({
    isSideNavOpen: state.ui.isSideNavOpen,
    menuItems: state.ui.menuItems,
    submenuItems: state.ui.submenuItems,
});

const mapDispatchToProps = (dispatch) => ({
    switchSidenav: (sidenavState) =>  dispatch(switchSidenavState(sidenavState)),
});

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;