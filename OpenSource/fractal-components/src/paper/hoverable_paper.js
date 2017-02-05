/**
 * Created by apple on 16/9/17.
 */
import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';

/**
 * @function 自带浮动效果的卡片
 */
export default class HoverablePaper extends Component {

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      zIndex: 1,
      depth: 1
    };
  }

  /**
   * @function 鼠标滑入的响应事件
   */
  mouseEnter = () => {
    this.setState({
      hover: true,
      zIndex: 10,
      depth: 3
    });
  }

  /**
   * @function 鼠标滑出的响应事件
   */
  mouseLeave = () => {
    this.setState({
      hover: false,
      zIndex: 1,
      depth: 1
    });
  }

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {

    let {style} = this.props;

    return <Paper
      draggable={true}
      style={Object.assign({},style,{
        height:'100%'
      })}
      zDepth={this.state.depth}
      onMouseEnter={this.mouseEnter}
      onMouseLeave={this.mouseLeave}>

      {this.props.children}

    </Paper>

  }

}