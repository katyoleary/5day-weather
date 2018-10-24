import React from 'react';
import { render as renderDOM } from 'react-dom';

import App from './components/app/app';


const app = document.createElement('div');
document.body.appendChild(app);
renderDOM(<App/>, body);