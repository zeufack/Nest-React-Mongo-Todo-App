import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todo from './todo/Todo';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './todo/store';

ReactDOM.render(
  <Provider store={store}>
    <Todo />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
