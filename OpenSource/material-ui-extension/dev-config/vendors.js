/**
 * Created by apple on 16/7/23.
 */
/**
 * @region React & Redux
 */
import React from 'react'; //React部分的Vendors
import Helmet from 'react-helmet';

//进行全局的Promise Polyfill
require('es6-promise').polyfill();

import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
