import React from 'react';

const SidenavSwitcher = ({isSidenavOpen, switchSidenav}) => (
  <button className='btn btn p-2 text-center' style={{width: '40px'}} title='Переключить боковую панель с выбором уроков' onClick={() => switchSidenav(!isSidenavOpen)}>
    {isSidenavOpen ? <span>&#10008;</span> : <span>&#9776;</span>}
  </button>
);

export default SidenavSwitcher;

