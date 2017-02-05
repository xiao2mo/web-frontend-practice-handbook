/**
 * 常用的带图片、title和description的卡片组件
 * *********************
 * *                   *
 * *        IMG        *
 * *                   *
 * *                   *
 * *********************
 * * TITLE             *
 * * description       *
 * *********************
 */
import React from 'react';
import Paper from 'material-ui/Paper';
import {grey200} from 'material-ui/styles/colors';
import {darken} from 'material-ui/utils/colorManipulator';

const getStyles = (state) => ({
  root: {
    position: 'relative',
    zIndex: state.zIndex,
    display: 'inline-block',
    width: 180,
    height: 172,
    cursor: 'pointer',
    verticalAlign: 'top'
  },
  image: {
    height: '50%',
    marginTop: '20%'
  },
  bottom: {
    position: 'absolute',
    backgroundColor: 'rgba(66, 66, 66, 0.6)',
    bottom: 0,
    height: 58,
    width: '100%'
  },
  title: {
    marginTop: 10,
    marginLeft: 14,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 600,
    color: 'white'
  },
  description: {
    textAlign: 'left',
    marginLeft: 14,
    lineHeight: 1.2,
    fontSize: 12,
    color: grey200
  }
});

export default class ImageTitleDesCard extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    image: React.PropTypes.string,
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    backgroundColor: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      zIndex: 1,
      depth: 1
    };
  }

  mouseEnter = () => {
    this.setState({
      hover: true,
      zIndex: 10,
      depth: 3
    });
  }

  mouseLeave = () => {
    this.setState({
      hover: false,
      zIndex: 1,
      depth: 1
    });
  }

  render() {
    const {style, backgroundColor, image, title, description, ...others} = this.props;
    const styles = getStyles(this.state);
    const {hover, depth} = this.state;
    const rootStyle = Object.assign(styles.root, style, {
      backgroundColor: hover ? darken(backgroundColor, 0.2) : backgroundColor
    });
    return (
      <Paper
        zDepth={depth}
        style={rootStyle}
        {...others}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}>
        <img style={styles.image} src={image}/>
        <div style={styles.bottom}>
          <div style={styles.title}>{title}</div>
          <div style={styles.description}>{description}</div>
        </div>
      </Paper>
    );
  }
}
