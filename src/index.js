import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { loginSlice } from './slice/login';
import { registerSlice } from './slice/register';
import{ranchSlice} from './slice/ranch'
import {ranchManagerSlice} from './slice/ranchManager'
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    rance:ranchSlice.reducer,
    ranchManager:ranchManagerSlice.reducer
  },
});
ReactDOM.render(
  <Router>
      <Provider store={store}>
    <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
