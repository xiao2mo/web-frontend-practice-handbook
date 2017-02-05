import React, { Component, PropTypes } from 'react';
import { RadioButton } from 'material-ui/RadioButton';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '5px'
  },
  rootChecked: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '5px',
    background: '#e0e0e0',
    borderRadius: '2px'
  },
  button: {
    width: '80%'
  },
  operationBox: {
    width: '20%'
  }
};


export default class OperationRadioButton extends Component {
  
  static PropTypes = {
    // 根元素样式
    style: PropTypes.object,
    
    // 选中状态的根元素样式
    checkedStyle: PropTypes.object,
    
    // 操作按钮
    operations: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      style: PropTypes.object,
      onClick: PropTypes.func
    }))
  };
  
  
  static defaultProps = {
    operations: [
      {
        name: '编辑',
        onClick: () => {alert('编辑')},
        style: {}
      },
      {
        name: '删除',
        onClick: () => {alert('删除')},
        style: {
          color: 'red'
        }
      }
    ],
    label: '测试'
  };
  
  state = {
    hideOperation: true
  };
  
  render() {
    
    const { operations, style, checkedStyle, checked, ...others } = this.props;
    
    return (
      <section
        className="operation_radio_button__container"
        style={this._getStyleByCheckedStatus(checked)}
        onMouseEnter={() => this.setState({hideOperation: false})}
        onMouseLeave={() => this.setState({hideOperation: true})}
        >
        <RadioButton checked={checked} {...others} style={styles.button}/>
        <div className="operation_box" style={styles.operationBox} hidden={this.state.hideOperation}>
          {operations.map((operation, index) => {
            return (
              <span onClick={operation.onClick} style={operation.style} key={`operaiton_${index}`}>{operation.name}</span>
            )
          })}
        </div>
      </section>
    )
    
  }
  
  _getStyleByCheckedStatus(checked) {
    
    const { style, checkedStyle } = this.props;
    if (checked) {
      return Object.assign({}, styles.rootChecked, checkedStyle);
    } else {
      return Object.assign({}, styles.root, style);
  
    }
  }
  
}