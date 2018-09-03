import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import allReducers from "./redux/reducer"
import App from './App';


const store = createStore(allReducers)
render(    
    <Provider store={store}> 			
      <App/>    
    </Provider>,
  document.getElementById('root')
);