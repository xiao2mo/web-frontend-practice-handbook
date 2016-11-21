import React from 'react';
import { cyan500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
require('./pager.scss');

const styles = {
  button: {
    width: 32,
    minWidth: 32,
    height: 32,
    lineHeight: 2,
    borderRadius: 16,
    fontSize: 16,
    margin: 5,
    padding: 0,
  },
  active: {
    width: 32,
    minWidth: 32,
    height: 32,
    lineHeight: 2,
    borderRadius: 16,
    fontSize: 16,
    color: '#fff',
    backgroundColor: cyan500,
    margin: 5,
  },
  label: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    lineHeight: 2,
    display: 'block',
  },
  icon: {
    verticalAlign: 'text-top'
  },
};

export default class Pager extends React.Component {
  static propTypes = {
    page: React.PropTypes.number,
    active: React.PropTypes.bool,
    last: React.PropTypes.bool,
    locale: React.PropTypes.object,
    icon: React.PropTypes.node,
    title: React.PropTypes.string,
  };

  render() {
    const props = this.props;
    if (props.icon) {
      return (
        <IconButton
          tooltip={props.title}
          onTouchTap={props.onTouchTap}
          style={styles.button}
          iconStyle={styles.icon}
        >
          {props.icon}
        </IconButton>
      );
    }

    if (props.active) {
      return (
        <FlatButton
          label={props.page}
          onTouchTap={props.onTouchTap}
          style={styles.active}
          labelStyle={styles.label}
          primary
        />
      );
    }

    return (
      <FlatButton
        label={props.page}
        onTouchTap={props.onTouchTap}
        style={styles.button}
        labelStyle={styles.label}
      />
    );
  }
}
