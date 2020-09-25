import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import GG from './GG'

ReactDOM.render(
  <React.StrictMode>
    <GG />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
