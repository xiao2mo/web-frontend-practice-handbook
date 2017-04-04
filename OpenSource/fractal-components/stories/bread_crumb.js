import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StoryPanel, StoryTitle, Example } from '../.storybook/stories.js';
import BreadCrumb from '../src/bread_crumb/bread_crumb';

//加载Divider
storiesOf('BreadCrumb', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo('BreadCrumb', `面包屑导航`, () => (
    <StoryPanel>
      <StoryTitle label="BreadCrumb" description="面包屑导航"/>
      <Example label="多个导航">
        <BreadCrumb crumbs={[{
          name:'导航一',
          onClick:()=>{action('点击导航')('导航一')}
        },{
          name:'导航二',
          onClick:()=>{action('点击导航')('导航二')}
        }]}/>
      </Example>
    </StoryPanel>
  ), {inline: false, propTables: [BreadCrumb]});