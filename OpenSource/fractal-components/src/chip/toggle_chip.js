import React, { Component, PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';

const styles = {
  selected: {
    labelColor: '#ffffff',
    backgroundColor: 'rgb(0, 188, 212)'
  },
  icon: {
    height: '32px',
    marginLeft: '-5px'
  }
};

export default class ToggleChip extends Component {
  
  static propTypes = {
    
    // 文字
    label: PropTypes.string,
    
    
    // 获取Chip当前状态的钩子
    onChange: PropTypes.func,
    
    // 值
    value: PropTypes.any
    
  }
  
  static defaultProps = {
    label: '测试标题',
    // 传入三个参数,event对象, value 和更新后的状态
    onChange: (e, v, newSelectedStatus) => {
      console.log(e, v, newSelectedStatus);}
  }
  
  state = {
    isSelected: false
  }
  
  render() {
    
    const { label, onChange, value } = this.props;
    
    
    let style = this.state.isSelected ? styles.selected : null;
      
    // onChange中取得的this.isSelected还未更新至新状态,使用setTimeout获得更新后的状态。
    return (
      <Chip
        onClick={(e) => {
          this._toggleStatus();
          setTimeout(() => {onChange(e, value, this.state.isSelected);}, 0);
        }}
        labelStyle={{display: 'flex', alignItems: 'center', padding: this.state.isSelected ? '0 8px 0 18px' : '0 16px'}}
        {...style}
      >
        {label}
        {this.state.isSelected ?
          <Avatar icon={<ActionCheckCircle style={{margin: '0'}}/>} backgroundColor="transparent" color="#ffffff" style={styles.icon}/>
          : null}
      </Chip>
    )
    
    
  }
  
  _toggleStatus() {
    
    this.setState({
      isSelected: !this.state.isSelected
    })
    
  }
    
}
