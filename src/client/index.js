import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

if (module.hot) {
  module.hot.accept();
}

import createStore from './store/index';
import App from './components/App.jsx';

let store = createStore();
let render = ReactDOM.render;

if (window.__PRELOADED_STATE__) {
  const preloadedState =  JSON.parse(window.__PRELOADED_STATE__);
  delete window.__PRELOADED_STATE__;

  store = createStore(preloadedState);
  render = ReactDOM.hydrate;
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const appContainer = document.querySelector('#app');
render(app, appContainer);
