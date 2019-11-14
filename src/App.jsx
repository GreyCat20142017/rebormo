import React from 'react';

import FooterContainer from './store/containers/FooterContainer';
import HeaderContainer from './store/containers/HeaderContainer';
import MainContainer from './store/containers/MainContainer';
import ContentContainer from './store/containers/ContentContainer';

const App = (props) => (
    <div className='bg-white min-vh-100 d-flex flex-column'>
        <nav className='mdb-color lighten-1 text-white'>
            <HeaderContainer/>
        </nav>
        <div className='flex-grow-1 overflow-auto p-2 container'>
            <MainContainer/>
            <div className='row w-100 p-2'>
                <div className="col-0 col-md-4">

                </div>

                <div className="col-12 col-md-7">
                    <ContentContainer/>
                </div>
            </div>

        </div>

        <div className='mdb-color lighten-1 text-white'>
            <FooterContainer/>
        </div>
    </div>
);

export default App;