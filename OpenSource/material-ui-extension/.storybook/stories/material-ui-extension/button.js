/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import BlueWhiteRaisedButton from '../../../material-ui-extension/button/raised/blue_white_raised_button';
import BlueBorderRaisedButton from '../../../material-ui-extension/button/raised/blue_border_raised_button';

//加载Divider
storiesOf('Button:按钮', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('Raised Button', () => {
    return <section>
      <h3>蓝底白字</h3>
      <BlueWhiteRaisedButton label="王下邀月熊"/>
      <BlueWhiteRaisedButton label='王下邀月熊' reverse={true}/>
    </section>
  })
  .add('蓝边框取消按钮', () => {
    return <section>
      <h3>蓝边蓝字</h3>
      <BlueBorderRaisedButton label="王下邀月熊"/>
    </section>
  });

