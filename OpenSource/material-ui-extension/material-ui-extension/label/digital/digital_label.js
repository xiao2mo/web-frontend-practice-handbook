// @flow
import React, { Component, PropTypes } from 'react';

/**
 * 组件DigitalLabel，用于显示合适的数字
 */
export default class DigitalLabel extends Component {

  static propTypes = {
    digital: PropTypes.number,
    local: PropTypes.string
  };

  static defaultProps = {
    digital: 0,
    local: 'zh'
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    const {digital, local} = this.props;

    return <span className="digital_label">

      {zhDigital[digital]}

    </span>

  }

}

const zhDigital = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];