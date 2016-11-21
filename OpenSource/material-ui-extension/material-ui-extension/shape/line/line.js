/**
 * Created by apple on 16/9/19.
 */
import React, { Component, PropTypes } from 'react';

/**
 * @function 直线
 */
export default class Line extends Component {

  static propTypes = {
    color: PropTypes.string //线条的颜色
  };

  static defaultProps = {
    color: 'black'
  };

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {

    require('./line.scss');

    return <section className="wx_line__container" style={{borderColor: this.props.color}}/>;
  }

}

/**
 * @function 浅灰色直线
 */
export class LightGreyLine extends Component {

  /**
   * @function 默认渲染函数
   */
  render() {

    return <Line color={'rgb(217,217,217)'}/>
  }

}