import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Col from './Col';

ReactDOM.render(
  <>{window.location.pathname.includes('col') ? <Col /> : <App />}</>,
  document.getElementById('root')
);
