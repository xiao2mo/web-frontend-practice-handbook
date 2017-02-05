/**
 * Created by apple on 16/9/17.
 */
/**
 * 常用的带图片、title和description的卡片组件
 * *********************
 * *                   *
 * *        IMG        *
 * *                   *
 * *                   *
 * *********************
 * * TITLE   Operation *
 * *********************
 */
import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
require('./image_title_operation_card.scss');

export default class ImageTitleOperationCard extends React.Component {
  static propTypes = {
    image: React.PropTypes.string,
    title: React.PropTypes.string,
    operations: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.func,
    }))
  };

  static defaultProps = {
    title: '我是一只喵喵.stl',
    image: 'https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/3/demo.png',
    operations: [{
      name: '操作',
      onClick: () => {
        console.log('onClick');
      }
    }]
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      zIndex: 1,
      depth: 1
    };
  }

  itemTouchTap() {

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


    const {title, image, operations} = this.props;

    return (
      <Paper
        style={{height:'100%'}}
        zDepth={this.state.depth}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}>
        <div className="image_title_operation_card__container">
          <div className="image" style={{backgroundImage:`url(${image})`}}/>
          <div className="bottom">
            <div className="title" title={title}>{title}</div>
            {
              operations.length > 0 && <div className="operation">
                <IconMenu
                  onTouchTap={event => event.stopPropagation()}
                  onItemTouchTap={this.itemTouchTap}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                >
                  {
                    operations.map((operation, index) => {
                      return <MenuItem key={index} primaryText={operation.name} onClick={operation.onClick}/>
                    })
                  }
                </IconMenu>
              </div>
            }
          </div>
        </div>

      </Paper>
    );
  }
}
