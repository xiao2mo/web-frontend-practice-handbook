// @flow
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import BlueWhiteRaisedButton from '../../button/raised/blue_white_raised_button';
require('./alert_dialog.scss');

/**
 * 组件AlertDialog
 */
export default class AlertDialog extends Component {

  static propTypes = {
    label: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
  };

  static defaultProps = {
    label: '提示信息提示信息提示信息',
    open: false,
    handleClose: () => {
      console.log('Close');
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

    const {label, handleClose, open} = this.props;

    const actions = [<BlueWhiteRaisedButton
      label="我知道了"
      primary={true}
      onTouchTap={handleClose}
    />];

    return <Dialog
      style={{width:'30em'}}
      className={'alert_dialog__container'}
      actionsContainerStyle={{paddingBottom:'2em'}}
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={handleClose}
    >
      <div className="label">
        {label}
      </div>
    </Dialog>

  }

}

