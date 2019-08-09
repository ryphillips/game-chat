import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore from './app/store/configureStore';
import { firebaseConfig } from './config/firebase';
import { initializeApp } from 'firebase';

initializeApp(firebaseConfig);
const reduxStore = configureStore();
const rootEl = document.getElementById("root");

const render = () => {
  const App = require("./app/layout/App").default;
  ReactDOM.render(
    <Provider store={reduxStore} >
      <App />
    </Provider>, rootEl
  );
};

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept("./app/layout/App", () => {
      setTimeout(render);
    });
  }
}

render();
serviceWorker.register();
