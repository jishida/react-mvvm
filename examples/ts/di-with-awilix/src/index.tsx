import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { configure } from './container';

configure();

ReactDOM.render(<App />, document.getElementById('root'));
