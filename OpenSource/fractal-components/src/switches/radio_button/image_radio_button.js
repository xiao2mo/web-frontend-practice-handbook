import React, { Component, PropTypes } from 'react';
import { RadioButton } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import UncheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import CheckedIcon from 'material-ui/svg-icons/toggle/check-box';

/**
 * @function 可以设置图片与文本的按钮
 */
export default class ImageRadioButton extends Component {

  static propTypes = {
    // 选中状态
    // checked: PropTypes.bool,
    // 按钮标签
    label: PropTypes.string,
    // 图片URL
    image: PropTypes.string,
    // 设置Paper样式
    style: PropTypes.object,
    // 回传的value
    // value: PropTypes.string,
    // 是否禁用按钮
    disabled: PropTypes.bool,
    //是否使用checkbox样式
    checkboxStyle:PropTypes.bool

  }

  static defaultProps = {
    label: '测试按钮',
    image: 'http://image.1001hao.com/equipment/2016/11/10/5823df61d7eff.jpg',
    disabled: false
  }

  state = {
    checked: false,
    depth: 1
  }

  render() {
    
    const { label, image, style, onCheck, value, disabled, ...others } = this.props;

    return (
      <Paper
        zDepth={this.state.depth}
        style={Object.assign({}, styles.root, style)}
        onMouseEnter={() => this._mouseEnter()}
        onMouseLeave={() => this._mouseLeave()}
        onClick={(e) => {
          if (disabled) return;
          onCheck(e, value);
        }}
      >
        <RadioButton
          style={styles.radioBtn}
          checkedIcon={this.props.checkboxStyle && <CheckedIcon/>}
          uncheckedIcon={this.props.checkboxStyle && <UncheckedIcon/>}
          disabled={disabled}
          {...others}
        />
        <span className="content" style={styles.content}>
          {!image || <img src={`${image}?imageView2/2/w/50`} alt="" style={styles.image}/>}
          {!label || <span style={styles.label}>{label}</span>}
        </span>
        <div hidden={!disabled} style={styles.modal}/>
      </Paper>
    )

  }


  _mouseEnter() {
    this.setState({
      depth: 2
    });

  }

  _mouseLeave() {
    this.setState({
      depth: 1
    });
  }

}

const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    height: '60px',
    position: 'relative'
  },
  image: {
    width: '40px',
    height: '40px',
    display: 'inline-block'
  },
  radioBtn: {
    display: 'inline-block',
    width: 'auto',
    height: '24px'
  },
  content: {
    marginLeft: '-5px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  label: {
    marginLeft: '5px',
  },
  modal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '1200',
    background: 'rgba(0, 0, 0, 0.3)'
  }
};