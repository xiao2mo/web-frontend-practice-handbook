/**
 * Created by apple on 16/10/19.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TitleDividerAction from '../../../material-ui-extension/divider/title_divider_action/title_divider_action';
import Divider from '../../../material-ui-extension/divider/divider';

//加载Divider
storiesOf('Divider:分割线', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('垂直分割线', () => (
    <div style={{height:'10em',margin:'5em'}}>
      <Divider/>
    </div>
  ))
  .add('标题-分割线-动作', () => (
    <div>
      <TitleDividerAction/>
    </div>
  ));

