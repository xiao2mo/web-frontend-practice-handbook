// @flow
import React, { Component, PropTypes } from 'react';
require('./bread_crumb.scss');

/**
 * 组件BreadCrumb，面包屑导航
 */
export default class BreadCrumb extends Component {

  static propTypes = {
    crumbs: PropTypes.arrayOf(PropTypes.shape({
      //面板屑名
      name: PropTypes.string,
      //面包屑点击事件
      onClick: PropTypes.func
    }))
  };

  static defaultProps = {};

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

    const {crumbs} = this.props;

    return <section className="bread_crumb__container">
      {
        crumbs && crumbs.map((crumb, index) => {

          //如果并非最后一个
          if (index !== crumbs.length - 1) {

            return <div className="crumb" onClick={crumb.onClick} key={index}>
              <span className="name">{crumb.name}</span>
              <span className="divider"> > </span>
            </div>

          } else {

            return <div className="crumb" key={index}>
              <span
                className="name current">{crumb.name}</span>
            </div>

          }

        })
      }
    </section>

  }

}

