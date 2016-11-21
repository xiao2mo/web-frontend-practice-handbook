/**
 * Created by apple on 16/10/19.
 */
import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
require('./title_divider_action.scss');
/**
 * @function 展示标题 - 连接线 - 操作
 */
export default class TitleDividerAction extends Component {

  static propTypes = {
    //标题
    title: PropTypes.string.isRequired,
    //操作名
    actionName: PropTypes.string.isRequired,
    //操作响应
    onClick: PropTypes.func
  };

  static defaultProps = {
    title: '3D打印机',
    actionName: '更多设备',
    onClick: ()=> {
      console.log('Click')
    }
  }

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {

    const {title, actionName, onClick} = this.props;
    
    return <section className="category_title_divider__container">
      <div className="title">{title}</div>
      <div className="lineBox">
        <span className="line"/>
      </div>
      <FlatButton
        primary
        label={actionName}
        labelPosition="before"
        icon={<HardwareKeyboardArrowDown/>}
        style={styles.more}
        labelStyle={styles.moreSpan}
        onTouchTap={onClick}
      />
    </section>
  }

}

/**
 * @function 组件样式
 * @type {{more: {height: string, lineHeight: string, marginTop: string, color: string}, moreSpan: {fontSize: string, color: string}}}
 */
const styles = {
  more: {
    height: '2em',
    lineHeight: 'auto',
    marginTop: '0.125em',
    color: '#0097a7',
  },
  moreSpan: {
    fontSize: '1em',
    color: '#0097a7',
  },
};