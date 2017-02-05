/**
 * 常用的带title和description和按钮的卡片组件
 * **************************************
 * *                                    *
 * *               TITLE                *
 * *            description             *
 * *               Button               *
 * *                                    *
 * **************************************
 */
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {grey800} from 'material-ui/styles/colors';

const styles = {
  root: {
    width: 600,
    height: 200,
    paddingTop: 48,
    textAlign: 'center'
  },
  title: {
    color: grey800,
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 4,
  },
  description: {
    color: grey800,
    fontSize: 16
  },
  button: {
    marginTop: 24
  },
  label: {
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 16
  }
};

export default class TitleDesButtonCard extends React.Component {
  static propTypes = {
    titleStyle: React.PropTypes.object,
    style: React.PropTypes.object,
    title: React.PropTypes.string,
    btnTouch: React.PropTypes.func,
    description: React.PropTypes.node,
    buttonLabel: React.PropTypes.string,
    disabled: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {titleStyle, style, title, description, buttonLabel, disabled} = this.props;
    const rootStyle = Object.assign(styles.root, style);
    const titleTheme = Object.assign({}, styles.title, titleStyle);
    return (
      <Paper style={rootStyle}>
        <div style={titleTheme}>{title}</div>
        <div style={styles.description}>{description}</div>
        <RaisedButton
          style={styles.button}
          primary
          disabled={disabled}
          onTouchTap={this.props.btnTouch}
          labelStyle={styles.label}
          label={buttonLabel}/>
      </Paper>
    );
  }
}
