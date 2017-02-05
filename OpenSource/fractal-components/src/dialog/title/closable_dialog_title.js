// @flow
import React, { Component, PropTypes } from 'react';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

/**
 * 组件ClosableDialogTitle，对话框标题
 */
export default class ClosableDialogTitle extends Component {

  static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    title: '标题'
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

    return <section
      style={{padding:"1em 2em",fontSize:'1.2em',display:'flex',justifyContent:'space-between'}}
      className="closable_dialog_title__container">

      <div className="title">
        {this.props.title}
      </div>

      <div className="action" style={{cursor:'pointer'}}>
        <NavigationClose onClick={this.props.onClose}/>
      </div>

    </section>

  }

}

