import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

localStorage.setItem('clientId', '09973a4c9f2f5e9e89dd058537599791');

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
