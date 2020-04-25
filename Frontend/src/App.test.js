import React from 'react';
import ReactDOM from 'react-dom';
import  Main from './components/Main';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';



const mockStore = configureStore([]);

let store = mockStore({
  userProfile: {
    profile: {}
  }
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<Provider store={store}>
    <BrowserRouter>
      <div><Main /></div></BrowserRouter></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});