// @flow

import App from './component/App';

import { observe } from 'observer-x';

observe({});

document.querySelector('#root').appendChild(App);
