/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HoverablePaper from '../../../material-ui-extension/paper/hoverable_paper';

//加载Divider
storiesOf('Paper:纸片效果', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('HoverablePaper:带浮动效果的Paper', ()=>(
    <section>
      <div>
        <h3>默认情况下宽度为100%</h3>
        <HoverablePaper>
          王下邀月熊
        </HoverablePaper>
      </div>
      <div>
        <h3>默认情况下宽度/高度由父组件决定</h3>
        <div style={{width:'15em',height:'10em'}}>
          <HoverablePaper>
            <div style={{}}>王下邀月熊</div>
          </HoverablePaper>
        </div>
      </div>
    </section>
  ));

