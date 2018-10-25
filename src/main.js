import React from 'react';
import { render as renderDOMRender } from 'react-dom';

import App from './components/app/app';


const body = document.createElement('div');
document.body.appendChild(body);
renderDOMRender(<App/>, body);
