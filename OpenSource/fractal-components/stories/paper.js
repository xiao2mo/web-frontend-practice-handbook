/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HoverablePaper from '../src/paper/hoverable_paper';
import { StoryPanel, StoryTitle, Example } from '../.storybook/stories.js';

//加载Divider
storiesOf('Paper', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo('HoverablePaper', `带浮动效果的Paper`, () => (
    <StoryPanel>
      <StoryTitle label="HoverablePaper" description="带浮动效果的Paper"/>
      <Example label="默认高度由父组件决定">
        <div style={{width:'15em',height:'10em'}}>
          <HoverablePaper>
            <div style={{}}>王下邀月熊</div>
          </HoverablePaper>
        </div>
      </Example>
    </StoryPanel>
  ), {inline: false, propTables: [HoverablePaper]});

