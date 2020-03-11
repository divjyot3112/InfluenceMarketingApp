import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );  
  }
}

export default App;
