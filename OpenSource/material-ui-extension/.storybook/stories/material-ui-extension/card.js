/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ImageTitleCard from '../../../material-ui-extension/card/image_title/image_title_card';
import ImageFloatingTitleCard from '../../../material-ui-extension/card/image_floating_title/image_floating_title_card';
import { StoryPanel, StoryTitle, Example } from '../../stories';
import ImageTitleOperationCard from '../../../material-ui-extension/card/image_title_operation/image_title_operation_card';
//加载Divider
storiesOf('Card', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <StoryPanel>
        {story()}
      </StoryPanel>
    </MuiThemeProvider>
  ))
  .add('图片-标题', () => (
    <section>
      <div>
        <h3>ImageFloatingTitleCard:标题浮动于图片</h3>
        <div>
          注意,该卡片的宽高需要由父组件确定
        </div>
        <div style={{width:'10em',height:'10em'}}>
          <ImageFloatingTitleCard/>
        </div>
      </div>
      <div>
        <h3>ImageFloatingTitleCard:标题浮动于图片并且完全覆盖</h3>
        <div>
          注意,该卡片的宽高需要由父组件确定
        </div>
        <div style={{width:'10em',height:'10em'}}>
          <ImageFloatingTitleCard covered={true}/>
        </div>
      </div>
      <div>
        <h3>ImageTitleCard:标题位于图片下方</h3>

        <ImageTitleCard/>
      </div>
    </section>
  ))
  .addWithInfo(
    'ImageTitleOperationCard',
    `
      图片-标题-操作
    `,
    () => (
      <StoryPanel>
        <StoryTitle label="ImageTitleOperationCard" description="图片-标题-操作"/>
        <section className="examples">
          <Example label="卡片高度由容器决定">
            <div style={{width:'10em',height:'12em'}}>
              <ImageTitleOperationCard/>
            </div>
          </Example>
        </section>
      </StoryPanel>
    ),
    {inline: false, propTables: [ImageTitleOperationCard]});