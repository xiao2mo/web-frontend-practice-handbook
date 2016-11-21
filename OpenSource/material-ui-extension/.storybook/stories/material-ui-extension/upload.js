/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import UploadChooser from '../../../material-ui-extension/upload/chooser/chooser';
import { StoryPanel, StoryTitle, Example } from '../../stories';
var Highlight = require('react-highlight');
//加载SVG ICONs
storiesOf('Upload 上传', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('UploadChooser:文件选择器', () => (
    <StoryPanel>
      <StoryTitle label="UploadChooser"/>


      <Example label="无限制选择文件，不进行MD5操作">
        <UploadChooser md5={false}/>
      </Example>

      <Example label="无限制选择文件，进行MD5操作">
        <UploadChooser md5={true}/>
      </Example>

      <Example
        label='文件类型参考'>

      </Example>


      <Example label="Component PropTypes">
        <Highlight className='js'>
          {
            `
          {
            //上传按钮显示的名称
            label: PropTypes.string,
            //文件类型
            types: PropTypes.arrayOf(PropTypes.string),
            //已存在的文件名
            existedFiles: PropTypes.arrayOf(PropTypes.string),
            //判断是否需要进行MD5操作
            md5: PropTypes.bool,
            //选择成功之后的回调事件
            //onChange的函数参数为:files: [{file:object,md5:string}]
            onChange: PropTypes.func
         }
        `
          }
        </Highlight>
      </Example>

    </StoryPanel>
  ));


