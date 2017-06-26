/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HoverablePaper from '../../src/paper/hoverable_paper';
import { StoryPanel, StoryTitle, Example } from '../stories';
import Tooltip from '../../src/tooltip/tooltip.js';

//加载Divider
storiesOf('Tooltip', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo('Tooltip', `浮动提示`, () => (
    <StoryPanel>
      <StoryTitle label="Tooltip" description="浮动提示"/>
      <Example label="默认位置">
        <Tooltip
          label={'标签'}
        />
      </Example>
    </StoryPanel>
  ), {inline: false, propTables: [HoverablePaper]});

