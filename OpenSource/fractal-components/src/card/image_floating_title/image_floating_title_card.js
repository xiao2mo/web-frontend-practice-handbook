/**
 * Created by apple on 16/10/21.
 */
import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import HoverablePaper from '../../paper/hoverable_paper';
require('./image_floating_title_card.scss');
/**
 * @function 默认的标题悬浮于标题图片的卡片
 */
export default class ImageFloatingTitleCard extends Component {

  static propTypes = {

    //标题
    title: PropTypes.string,

    //标题字号
    titleFontSize: PropTypes.string,

    //标题颜色
    titleColor: PropTypes.string,

    //标题背景颜色
    titleBackgroundColor: PropTypes.string,

    //判断标题是否需要覆盖图片
    covered: PropTypes.bool,

    //判断是否显示阴影效果
    hoverable: PropTypes.bool,

    //图片
    image: PropTypes.string,

    //点击响应事件
    onClick: PropTypes.func,

  };

  static defaultProps = {
    title: '测试标题',
    titleFontSize: '1em',
    titleColor: 'white',
    titleBackgroundColor: 'rgb(108,108,108)',
    covered: false,
    hoverable: true,
    image: 'http://image.1001hao.com/material/2016/10/14/58008fd7107f2.png',
    onClick: () => {
      console.log('Click!');
    }
  };

  /**
   * @function 默认渲染函数
   */
  render() {

    const {title, titleFontSize, titleColor, titleBackgroundColor, covered, hoverable, image, onClick} = this.props;


    //根据是否覆盖判断不同的类名
    let titleClassName = covered ? 'title_covered' : 'title';

    let content = <div className="image" style={{backgroundImage:`url(${image})`}}>
      <div className={`${titleClassName}`} style={{backgroundColor:`${titleBackgroundColor}`}}>
        <div className="label" style={{color: `${titleColor}`, fontSize: `${titleFontSize}`}}>
          {title}
        </div>
      </div>
    </div>;

    if (hoverable) {
      return <section className="image_floating_title_card__container" onClick={onClick}>
        <HoverablePaper>
          {content}
        </HoverablePaper>
      </section>
    }
    else {
      return <section className="image_floating_title_card__container" onClick={onClick}>
        <Paper style={{height:'100%'}}>
          {content}
        </Paper>
      </section>
    }
  }

}