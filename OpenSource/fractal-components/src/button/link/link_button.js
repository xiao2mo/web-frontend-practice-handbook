// @flow
import React, { Component, PropTypes } from 'react';
require('./link_button.scss');

/**
 * 组件BlueLinkButton
 */
export default class BlueLinkButton extends Component {

  static displayName = 'BlueLinkButton';

  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    label: '查看详情',
    onClick: () => {
      console.log('Click!')
    }
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

    const {label, onClick} = this.props;

    return <div style={{cursor:'pointer'}} className="blue_link_button" onClick={onClick}>
      {label}
    </div>

  }

}