// @flow
import React, { Component, PropTypes } from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import './tip_button.scss';


export default class TipButton extends Component {
  
  static propTypes = {
    // tip显示位置
    tipPosition: PropTypes.oneOf(['top', 'bottom']),
    
    // 图标
    icon: PropTypes.node,
    
    //点击事件
    onClick: PropTypes.func,
    
    // tip内容
    tip: PropTypes.string,
    
    // tip样式
    tipStyle: PropTypes.object
  };
  
  static defaultProps = {
    tipPosition: 'bottom',
    icon: <DeleteIcon color="#9b9b9b"/>,
    onClick: () => {},
    tip: '删除',
    tipStyle: {}
  };
  
  state = {
    showTip: false
  };
  
  constructor(props) {
    super(props);
    this._toggleTip = this._toggleTip.bind(this);
  }
  
  render() {
    
    const { tipPosition, icon, onClick, tip } = this.props;
    
    if (tipPosition === 'top') {
      return (
        <section className="delete_button__container">
          <div className="tip_wrapper_top" hidden={!this.state.showTip}>
            <div className="tip">
              {tip}
            </div>
            <div className="arrow_top arrow"></div>
          </div>
          <div className="icon" onMouseEnter={this._toggleTip} onMouseLeave={this._toggleTip} onClick={onClick}>
            {icon}
          </div>
        </section>
      )
    } else {
      return (
        <section className="delete_button__container">
          <div className="icon" onMouseEnter={this._toggleTip} onMouseLeave={this._toggleTip} onClick={onClick}>
            {icon}
          </div>
          <div className="tip_wrapper_bottom" hidden={!this.state.showTip}>
            <div className="arrow_bottom arrow"></div>
            <div className="tip">
              {tip}
            </div>
          </div>
        </section>
      )
    }
    
  }
  
  _toggleTip() {
    this.setState({
      showTip: !this.state.showTip
    })
  };
  
}