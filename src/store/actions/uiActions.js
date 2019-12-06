export const ACTIONS = {
      SIDENAV_STATE_SWITCH: 'SIDENAV_STATE_SWITCH'
};

export const switchSidenavState = (sidenavState) => ({
    type: ACTIONS.SIDENAV_STATE_SWITCH,
    payload: sidenavState
});

