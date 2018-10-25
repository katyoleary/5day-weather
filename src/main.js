import React from 'react';
import { render as renderDOM } from 'react-dom';

import App from './components/app/app';


const body = document.createElement('div');
document.body.appendChild(body);
renderDOM(<App/>, body);
