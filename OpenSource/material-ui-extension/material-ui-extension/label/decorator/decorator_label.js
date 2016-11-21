// @flow
import React, { Component, PropTypes } from 'react';
require('./decorator_label.scss');

/**
 * 组件DigitalLabel，用于显示合适的数字
 */
export default class DecoratorLabel extends Component {

  static propTypes = {
    label: PropTypes.node,
    className: PropTypes.string,
    required: PropTypes.bool
  };

  static defaultProps = {
    label: '王下邀月熊',
    className: 'class_name',
    required: true
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

    const {label, required, className} = this.props;

    let classNames = [];

    if (required) classNames.push('required');


    return <section className="decorator_label__container">

      <span className={`${className} ${classNames.join(' ')}`}>
        {label}
      </span>

    </section>

  }

}