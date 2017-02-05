import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Tooltip from 'material-ui/internal/Tooltip';

const styles = {
  root: {
    position: 'relative',
    textAlign: 'center'
  },
  tooltip: {
    top: -20,
    left: -14,
    textAlign: 'center',
    width: '100%',
    minWidth: '100px'
  }
};

export default class FloatingButton extends React.Component {

  static displayName = 'FloatingButton';

  static propTypes = {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
    tooltip: React.PropTypes.string,
    tooltipStyle: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      hoveredTooltip: false
    };
  }

  render() {
    const {style, tooltip, tooltipStyle, ...other} = this.props;
    const rootStyle = Object.assign({}, styles.root, style);
    const tooltipstyle = Object.assign({}, styles.tooltip, tooltipStyle);
    return (
      <div style={rootStyle}>
        <Tooltip show={this.state.hoveredTooltip}
                 label={tooltip}
                 style={tooltipstyle}
                 horizontalPosition="left"
                 verticalPosition="top"
                 touch
        />
        <FloatingActionButton
          onMouseEnter={()=>{this.setState({hoveredTooltip: true});}}
          onMouseLeave={()=>{this.setState({hoveredTooltip: false});}}
          {...other}
        >
          {this.props.children}
        </FloatingActionButton>
      </div>
    );
  }
}
