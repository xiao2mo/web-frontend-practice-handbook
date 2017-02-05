// @flow
import React, {Component, PropTypes} from 'react';
import MenuItem from 'material-ui/MenuItem';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

require('./navigation_drop_down_menu.scss');
/**
 * 组件NavigationDropdownMenu
 */
export default class NavigationDropDownMenu extends Component {

  static propTypes = {
    //标签元素
    label: PropTypes.node,

    //菜单项
    menus: PropTypes.arrayOf(PropTypes.shape({
      //菜单名
      name: PropTypes.string,
      //点击事件
      onClick: PropTypes.func
    }))
  };

  static defaultProps = {};

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  handleMouseEnter = (event) => {

    this.setState({
      open: true,
    });
  };

  handleMouseLeave = (event) => {
    event.preventDefault();

    //防止鼠标移到菜单边缘时触发 mouseLeave
    if(event.relatedTarget.className != 'navigation_drop_down_menu__popover'){
      this.setState({
        open: false
      });
    }
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  /**
   * @function 默认渲染函数
   */
  render() {

    let dropdown = '';
    if (this.props.menus.length) {
      dropdown = <span className="navigation_drop_down_menu__icon"/>
    }

    return <section
      className="navigation_drop_down_menu__container" ref='anchor'
      style={{display:'flex'}}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      onTouchTap={this.handleMouseEnter}
      >
      <span
        style={{
          display:'flex',
          alignItems:'center'
        }}
      >
        {this.props.label}&nbsp;
      </span>
      {dropdown}
      <Popover className="navigation_drop_down_menu__popover"
        open={this.state.open}
        anchorEl={this.refs.anchor}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
        animation={PopoverAnimationVertical}
        useLayerForClickAway={false}
        style={{
            borderTop:'2px solid #2ab7cb',
            backgroundColor:'#333',
            borderRadius:'0 0 2px 2px',
          }}
      >
        <Menu
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {
            this.props.menus.map(({name, onClick}, index) => (
              <MenuItem
                className="navigation_drop_down_menu__item"
                key={index}
                onTouchTap={onClick}
                value={index}
                primaryText={name}/>
            ))
          }
        </Menu>
      </Popover>
    </section>

  }

}

