// @flow
import React, { Component, PropTypes } from 'react';
import Tooltip from '../../tooltip/tooltip';
import './elliptical_label.scss';


const EllipticalLabel = ({label = '我很长很长很长很长很长很长很长很长', tip = label, verticalPosition = 'top', horizontalPosition = 'center'}) => (
  <section className="elliptical_label__container">
    <Tooltip
      label={<span className="elliptical_label">{label}</span>}
      tip={<span className="elliptical_tip">{tip}</span>}
      verticalPosition={verticalPosition}
      horizontalPosition={horizontalPosition}
    />
  </section>
);

EllipticalLabel.propTypes = {
    label: PropTypes.node.isRequired,

    tip: PropTypes.node.isRequired,

    horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),

    verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
    //是否使用HTML原生提示
    native: PropTypes.bool
};

export default EllipticalLabel;


/**
 * 组件EllipticalLabel，省略加提示的标签
 */
// export default class EllipticalLabel extends Component {
//
//   static propTypes = {
//     label: PropTypes.node.isRequired,
//
//     tip: PropTypes.node.isRequired,
//
//     horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
//
//     verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
//     //是否使用HTML原生提示
//     native: PropTypes.bool
//   };
//
//   static defaultProps = {
//     label: '删除',
//     tip: '我要删除'
//   };
//
//   /**
//    * @function 默认构造函数
//    * @param props
//    */
//   constructor(props) {
//     super(props);
//   }
//
//   /**
//    * @function 组件挂载完成回调
//    */
//   componentDidMount() {
//
//   }
//
//   /**
//    * @function 默认渲染函数
//    */
//   render() {
//
//     const { label, tip, horizontalPosition, verticalPosition } = this.props;
//
//     return <section className="elliptical_label__container">
//       <Tooltip
//         label={<span className="elliptical_label">{this.props.label}</span>}
//         tip={<span className="elliptical_tip">{this.props.tip}</span>}
//         verticalPosition={verticalPosition}
//         horizontalPosition={horizontalPosition}
//       />
//     </section>
//
//   }
//
// }

