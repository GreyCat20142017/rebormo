import React from 'react';
import './App.css';
import CoursesContainer from './store/containers/CoursesContainer';
import LessonsContainer from './store/containers/LessonsContainer';
import ContentContainer from './store/containers/ContentContainer';

const App = () => {

    return (
        <div className="container p-3">
            <header className="row">
                <h2>Rebormo : Remake Bormo with Redux</h2>
            </header>
            <div className='row'>
                <div className="col-0 col-md-4">
                    <CoursesContainer/>
                    <LessonsContainer/>
                </div>
                <div className="col-12 col-md-7">
                    <ContentContainer/>
                </div>
            </div>
        </div>
    );
};

export default App;
