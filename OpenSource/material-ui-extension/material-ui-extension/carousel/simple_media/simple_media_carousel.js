/**
 * Created by apple on 16/10/21.
 */
import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import HardWareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardWareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { grey300 } from 'material-ui/styles/colors';

//测试数据
const testMedium = [
  {
    id: 0,
    type: 'image',
    src: 'http://image.1001hao.com/equipment/2016/10/24/580d62af65d62.jpeg',
    onClick: () => {
    }

  }, {
    id: 1,
    type: 'image',
    src: 'http://image.1001hao.com/material/2016/10/19/5806e3a670741.jpg',
    onClick: () => {
    }

  }];

/**
 * @function 简单的用于展示图片/视频资源的走马灯
 */
export default class SimpleMediaCarousel extends React.Component {

  //默认的
  static propTypes = {

    //需要展示的数据
    medium: PropTypes.arrayOf(PropTypes.shape({
      //资源编号,从0开始
      id: PropTypes.number,
      //资源类型,图片或者视频
      type: PropTypes.oneOf(['image', 'video']),
      //资源的封面路径
      src: PropTypes.string,
      //点击该资源的事件
      onClick: PropTypes.func,
    })),

    //左箭头样式
    leftArrow: PropTypes.element,

    //右箭头样式
    rightArrow: PropTypes.element
  };

  static defaultProps = {
    medium: testMedium,
    leftArrow: <HardWareKeyboardArrowLeft/>,
    rightArrow: <HardWareKeyboardArrowRight/>

  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      //当前要展示的资源的下标
      current: (props.medium && props.medium.length > 0) ? props.medium[0].id : 0,
      //能够展示的最大的资源的下标
      max: (props.medium && props.medium.length > 0) ? (props.medium.length - 1) : 0
    };
  }

  /**
   * @function 如果Props发生了变更,则调整能够展示的最大的资源的下标
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      max: (nextProps.medium && nextProps.medium.length > 0) ? (nextProps.medium.length - 1) : 0
    });
  }

  /**
   * @function 点击左箭头响应函数
   */
  handleSlideLeft = () => {
    this.setState({
      current: (this.state.current === 0) ? this.state.max : (this.state.current - 1)
    });
  };

  /**
   * @function 点击右箭头响应函数
   */
  handleSlideRight = () => {
    this.setState({
      current: (this.state.current === this.state.max) ? 0 : (this.state.current + 1)
    });
  };

  /**
   * @function 默认渲染视频
   * @param media
   * @param index
   * @return {XML}
   */
  _renderVideo(media, index) {
    return (
      <div style={styles.video} key={index} allowFullScreen>
        <video controls name="media" style={styles.video}>
          <source src={media.src} type="video/mp4"/>
        </video>
      </div>
    );
  }

  /**
   * @function 默认渲染图片
   * @param media
   * @param index
   * @return {XML}
   */
  _renderImage(media, index) {

    return (
      <div key={index} style={{...styles.image, backgroundImage: `url(${media.src})`}}></div>
    );
  }

  render() {
    const {medium, leftArrow, rightArrow} = this.props;
    return (
      <section style={styles.root}>
        <IconButton
          onTouchTap={this.handleSlideLeft}
          iconStyle={styles.icon}
          style={styles.leftArrow}>
          {leftArrow}
        </IconButton>
        <div style={styles.media}>
          {(medium && medium.length > 0) && medium.map((media, index) => {
            return (
              (media.id === this.state.current) && (() => {
                switch (media.type) {
                  case 'video':
                    return this._renderVideo(media, `${media.id}`);
                  case 'image':
                    return this._renderImage(media, `${media.id}`);
                  default:
                    return null;
                }
              })()
            );
          })}
        </div>
        <IconButton
          onTouchTap={this.handleSlideRight}
          iconStyle={styles.icon}
          style={styles.rightArrow}>
          {rightArrow}
        </IconButton>
      </section>
    );
  }
}

/**
 * @function 样式定义
 * @type {{root: {display: string, justifyContent: string, alignItems: string}, icon: {width: number, height: number, color: string}, leftArrow: {width: number, height: number, padding: number}, rightArrow: {width: number, height: number, padding: number}, media: {width: string, height: string, margin: string}, image: {width: string, height: string, backgroundRepeat: string, backgroundSize: string, backgroundPosition: string}, video: {width: string, height: string, border: number}, show: {display: string}, hide: {display: string}}}
 */
const styles = {
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 64,
    height: 64,
    color: grey300
  },
  leftArrow: {
    width: 64,
    height: 64,
    padding: 0,
  },
  rightArrow: {
    width: 64,
    height: 64,
    padding: 0,
  },
  media: {
    width: '80%',
    height: '100%',
    margin: '0 0.375em',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    border: 0,
  },
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  }
};


