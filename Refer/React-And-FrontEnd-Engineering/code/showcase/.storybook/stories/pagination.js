/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Pagination from '../../src/pagination/pagination';
import { StoryPanel, StoryTitle, Example } from '../stories';
import Pager from '../../src/pagination/pager';

//加载Divider
storiesOf('Pagination', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('Pagination', () => (
    <StoryPanel>
      <StoryTitle label="Pagination" description="常用于列表、网格等多页情况下"/>

      <Example label="基本分页使用">
        <Pagination/>
      </Example>

    </StoryPanel>
  ))
  .add('Pager', () => (
    <StoryPanel>
      <StoryTitle label="Pager" description="分页指示器中的分页页标"/>

      <Example label="基本分页页标">
        <Pager page={1}/>
        <Pager page={2}/>

      </Example>

      <Example label="当前页标">
        <Pager page={1} active={true}/>
        <Pager page={2}/>
      </Example>

    </StoryPanel>
  ));

