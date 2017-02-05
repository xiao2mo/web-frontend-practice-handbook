// @flow
import React, { Component, PropTypes } from 'react';
import InternalTooltip from 'material-ui/internal/Tooltip';
import './tooltip.scss';

/**
 * 组件Tooltip
 */
export default class Tooltip extends Component {

  static propTypes = {
    label: PropTypes.node.isRequired,
    
    tip: PropTypes.node.isRequired
  };

  static defaultProps = {
    label: 'Label'
  };

  state = {
    showTooltip: false
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

    return <section className="tooltip__container"
                    onMouseEnter={()=>{
                      this.setState({showTooltip:true})
                    }}
                    onMouseLeave={()=>{
                      this.setState({showTooltip:false})
                    }}
    >
      <InternalTooltip
        show={this.state.showTooltip}
        horizontalPosition="center"
        verticalPosition="bottom"
        label={this.props.tip}
      />
      {this.props.label}
    </section>

  }

}

