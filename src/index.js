import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import Artists from './components/Artists';
import Albums from './components/Albums';

const routes = (
  <BrowserRouter>
    <div>
      <Route exact={true} path='/' component={Artists} />
      <Route path='/albums/:name' component={Albums} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
