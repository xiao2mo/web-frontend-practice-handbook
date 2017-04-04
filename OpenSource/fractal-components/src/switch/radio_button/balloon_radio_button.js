import React, { Component, PropTypes } from 'react';
import { RadioButton } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';

const styles = {
  rootStyle: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10em'
  },
  imageStyle: {
    width: '100%',
    height: '10em',
    marginBottom: '2em',
    backgroundSize: 'cover',
    backgroundPosition: 'center, center'
  },
  buttonStyle: {
    width: 'auto',
    height: '1.5em',
    display: 'inline-block'
  },
  buttonLabelStyle: {
    display: 'inline-block',
    height: 'auto',
    width: 'auto'
  }
};

/*
*  按钮上方有清晰大图的radio button
* */
export default class BalloonRadioButton extends Component {
  
  static propTypes = {
    // container样式
    rootStyle: PropTypes.object,
    
    // 图片
    image: PropTypes.string,
    
    // 按钮属性
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    buttonStyle: PropTypes.object,
    buttonLabelStyle: PropTypes.object,
    
    // Paper属性
    circle: PropTypes.bool,
    rounded: PropTypes.bool,
    transitionEnabled: PropTypes.bool,
    zDepth: PropTypes.number,
    imageStyle: PropTypes.object
  }
  
  static defaultProps = {
    label: '测试标题',
    image: 'http://image.1001hao.com/equipment/2016/11/21/5832aef727f6a.jpg',
    
    // radio button 默认属性
    buttonStyle: {},
    buttonLabelStyle: {},
    
    // Paper默认属性
    circle: false,
    rounded: true,
    transitionEnabled: true,
    zDepth: 1,
    imageStyle: {}
  }
  
  render() {
    
    const { rootStyle, image, label, value, circle, rounded, transitionEnabled, zDepth, imageStyle, buttonStyle, buttonLabelStyle, ...others } = this.props;
    
    return (
      <section className="balloon_radio_button__container" style={Object.assign({}, styles.rootStyle, rootStyle)}>
        <Paper
          circle={circle}
          rounded={rounded}
          transitionEnabled={transitionEnabled}
          zDepth={zDepth}
          style={Object.assign({}, styles.imageStyle, {backgroundImage: `url(${image})`}, imageStyle)}
        />
        <RadioButton
          value={value}
          label={label}
          style={Object.assign({}, styles.buttonStyle, buttonStyle)}
          labelStyle={Object.assign({}, styles.buttonLabelStyle, buttonLabelStyle)}
          {...others}
        />
      </section>
      
    )
    
  }
  
  
}