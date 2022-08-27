import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import TranslationApp from './App';
import { reducer } from './store/reducer';

import './index.css';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const container: any = document.getElementById('root');
const root = createRoot(container);
const store = createStore(
    reducer,
    composeEnhancers()
);

root.render(<Provider store={store}><TranslationApp /></Provider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
