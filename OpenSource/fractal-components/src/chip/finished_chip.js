/**
 * Created by apple on 16/9/17.
 */
import React, { Component, PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';

const finishedStyles = {
  okIcon: {
    color: 'white',
    cursor: 'pointer',
    margin: '0px -8px 0px 5px',
  },
  label: {
    color: 'white',
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '32px',
    paddingLeft: 12,
    paddingRight: 12,
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  root: {
    backgroundColor: 'rgb(63,154,62)',
    borderRadius: 16,
    boxShadow: null,
    display: 'flex',
    whiteSpace: 'nowrap',
    width: 'fit-content',
    height: '32px'
  },
};

/**
 * @function 带有完成显示的Chip
 * @applied 添加零件页面底部的指示条
 */
export default class FinishedChip extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    finished: PropTypes.bool // 判断是否显示为已完成
  };

  static defaultProps = {
    label: "零件信息",
    finished: false
  }

  /**
   * @function 渲染完成之后的Chip
   * @private
   */
  _renderFinished() {
    return <section className="finished_chip__container">
      <EnhancedButton
        containerElement="div" // Firefox doesn't support nested buttons
        disableTouchRipple={true}
        disableFocusRipple={true}
        style={finishedStyles.root}
      >
        <span style={finishedStyles.label}>
          <div style={{display:'flex',alignItems:'center'}}>
            {this.props.label}
            <ActionCheckCircle color='white' style={finishedStyles.okIcon}/>
          </div>
        </span>
      </EnhancedButton>
    </section>
  }

  render() {

    if (this.props.finished) {
      return this._renderFinished();
    }

    return <section className="finished_chip__container">
      <Chip
        key={this.props.label}
        onRequestDelete={() => {
        }}
      >
        {this.props.label}
      </Chip>
    </section>
  }
}
