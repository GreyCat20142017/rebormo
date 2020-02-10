import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
// import {Provider} from 'react-redux';
// import store from './store/store';
// import {coursesLoading} from './store/actions/dataActions';

// const defaultKey = store.getState().data.apiKey;
// store.dispatch(coursesLoading(defaultKey, true));
// store.dispatch(coursesLoading(defaultKey, false));

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>, document.getElementById('react'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
