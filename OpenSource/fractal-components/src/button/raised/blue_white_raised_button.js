/**
 * Created by apple on 16/9/14.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

function getStyles() {
  return {
    root: {
      clear: 'both',
      textAlign: 'center'
    },
    loginButtonLabel: {
      letterSpacing: 1,
      fontSize: '1em',
      fontWeight: "bold",
      cursor: 'pointer'
    },
  };
}

export default class BlueWhiteRaisedButton extends React.Component {

  static displayName = 'BlueWhiteRaisedButton';

  static propTypes = {
    //按钮上显示的标签
    label: React.PropTypes.string,
    reverse: React.PropTypes.bool
  };

  static defaultProps = {
    reverse: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    const styles = getStyles();
    const {label, reverse, ...others} = this.props;

    if (!this.props.reverse) {
      return (
        <div style={styles.root}>
          <RaisedButton
            {...others}
            labelStyle={styles.loginButtonLabel}
            label={label}
            primary
          />
        </div>
      );
    } else {
      return (
        <div style={styles.root}>

          <RaisedButton
            {...others}
            labelStyle={styles.loginButtonLabel}
            label={label}
            backgroundColor='rgb(217,217,217)'
            labelColor='rgb(29,162,185)'
          />
        </div>
      );
    }


  }
}
