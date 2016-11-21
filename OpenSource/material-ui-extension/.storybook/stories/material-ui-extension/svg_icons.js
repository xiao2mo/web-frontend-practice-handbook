/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Money from '../../../material-ui-extension/svg_icons/action/money';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TwoWayHalfArrow from '../../../material-ui-extension/svg_icons/navigation/two_way_half_arrow';
import Bulb from '../../../material-ui-extension/svg_icons/tooltip/bulb';

//加载SVG ICONs
storiesOf('SVG 图标', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('指示类', () => (
    <div>
      <h3>灯泡</h3>
      <Bulb/>
    </div>
  ))
  .add('动作类指向类图标', () => (
    <div>
      <h3>金钱/购买</h3>
      <Money/>
      <Money color="red"/>
    </div>
  )).add('Navigation', () => (
  <div>
    <h3>箭头</h3>
    <TwoWayHalfArrow/>
  </div>
));

