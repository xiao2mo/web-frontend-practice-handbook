import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class BlueBorderRaisedButton extends Component {

  static displayName = 'BlueBorderRaisedButton';

  render() {
    let {labelColor, backgroundColor, buttonStyle, ...others} = this.props;
    const btnStyle = Object.assign({}, buttonStyle, styles.btnStyle);
    return (
      <RaisedButton
        {...others}
        labelColor="#3ca3ba"
        backgroundColor="#f0f0f0"
        buttonStyle={btnStyle}
      />
    )
  }
}

const styles = {
  btnStyle: {
    boxShadow: '0 0 1px 1px #3ca3ba inset'
  }
};

