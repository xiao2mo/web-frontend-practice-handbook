/**
 * 常用的带图片和标题的卡片组件
 * *********************
 * *                   *
 * *        IMG        *
 * *                   *
 * *                   *
 * *********************
 * * TITLE             *
 * *********************
 */
import React from 'react';
import Paper from 'material-ui/Paper';
// import {darken} from 'material-ui/utils/colorManipulator';

const getStyles = () => ({
  root: {
    // zIndex: state.zIndex,
    width: '9.375em',
    height: '11.375em',
    cursor: 'pointer',
  },
  image: {
    height: '9.375em',
    width: '9.375em',
    display: 'block',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  bottom: {
    height: '2.0625em',
    width: '100%'
  },
  title: {
    paddingLeft: '1em',
    paddingRight: '1em',
    textAlign: 'left',
    fontSize: '0.8125em',
    lineHeight: '2.5384em',
    color: '#4a4a4a',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
});

/**
 * @function 图片与标题的卡片
 */
export default class ImageTitleCard extends React.Component {

  //需要输入的外部属性
  static propTypes = {
    style: React.PropTypes.object,
    image: React.PropTypes.string,
    title: React.PropTypes.string,
    backgroundColor: React.PropTypes.string
  };

  //默认输入的属性
  static defaultProps = {

    title: '测试标题',
    image: 'http://image.1001hao.com/material/2016/10/14/58008fd7107f2.png',
    backgroundColor: ''

  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      // zIndex: 1,
      depth: 1
    };
  }

  mouseEnter = () => {
    this.setState({
      hover: true,
      // zIndex: 10,
      depth: 3
    });
  }

  mouseLeave = () => {
    this.setState({
      hover: false,
      // zIndex: 1,
      depth: 1
    });
  }

  render() {
    // others传入background导致warning, 没发现有什么用途, 先删除
    const {style, image, title, onClick, onTouchTap, ...others} = this.props;
    const styles = getStyles(this.state);
    const {depth} = this.state;
    // const {hover, depth} = this.state;
    const rootStyle = Object.assign(styles.root, style, {
      //   backgroundColor: hover ? darken(backgroundColor, 0.2) : backgroundColor
    });
    return (
      <Paper
        zDepth={depth}
        style={rootStyle}
        onClick={onClick}
        onTouchTap={onTouchTap}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}>
        <div style={{...styles.image, backgroundImage: `url(${image})`}}></div>
        <div style={styles.bottom}>
          <div style={styles.title} title={title}>{title}</div>
        </div>
      </Paper>
    );
  }
}
