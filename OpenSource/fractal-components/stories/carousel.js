/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SimpleMediaCarousel from '../src/carousel/simple_media/simple_media_carousel';

const medium = [
  {
    id: 0,
    type: 'image',
    src: 'http://1001hao.oneooone.com/dist/de0c8cb9cb4f56bc1be7b9a6b86c0243.png',
    onClick: ()=> {
    }

  }, {
    id: 1,
    type: 'image',
    src: 'http://image.1001hao.com/material/2016/10/19/5806e3a670741.jpg',
    onClick: ()=> {
    }

  }];

//加载Divider
storiesOf('Carousel:走马灯', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('SimpleMediaCarousel', ()=>(
    <section>
      <div>
        <h3>简单的混合了图片与视频的走马灯,父组件需要给定尺寸</h3>
        <div style={{width:'35em',height:'25em'}}>
          <SimpleMediaCarousel medium={medium}/>
        </div>
      </div>
    </section>
  ));

