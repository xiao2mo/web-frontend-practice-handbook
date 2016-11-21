// @flow

import React, { Component, PropTypes } from 'react';

/**
 * @function 通用的登录组件
 */
export class Login extends Component {

  static propTypes = {

    //默认的用户名
    defaultUserName: PropTypes.string,

    //用户点击登录按钮的响应事件
    onLogin: PropTypes.func

  };

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {
    return <section className="login__container">
      Login
    </section>
  }
}