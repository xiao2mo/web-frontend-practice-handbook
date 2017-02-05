import React, {Component, PropTypes} from 'react';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton';


// 通用RadioButtonGroup,适用于各种基于RadioButton封装的自定义RadioButton
export default class CommonRadioButtonGroup extends RadioButtonGroup {
  
  static propTypes = {
    // 传入自定义的RadioButton
    customRadioButton: PropTypes.func
  }
  
  static defaultProps = {
    customRadioButton: RadioButton
  }
  
  handleChange = (event, newSelection) => {
    this.updateRadioButtons(newSelection);
    // Successful update
    if (this.state.numberCheckedRadioButtons === 0) {
      if (this.props.onChange && this.state.selected !== newSelection) this.props.onChange(event, newSelection);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    
    if(nextProps.name !== this.props.name) {
      this.setState({
        selected: nextProps.defaultSelected === void 0 ? null : newProps.defaultSelected
      })
    }
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({
        selected: nextProps.valueSelected,
      });
    }
  }
  
  render() {
    const {prepareStyles} = this.context.muiTheme;
    
    const options = React.Children.map(this.props.children, (option) => {
      const {
        name, // eslint-disable-line no-unused-vars
        value, // eslint-disable-line no-unused-vars
        label, // eslint-disable-line no-unused-vars
        onCheck, // eslint-disable-line no-unused-vars
        ...other
      } = option.props;
      
      // return (
      //   <option
      //     {...other}
      //     ref={option.props.value}
      //     name={this.props.name}
      //     key={option.props.value}
      //     value={option.props.value}
      //     label={option.props.label}
      //     onCheck={this.handleChange}
      //     checked={option.props.value === this.state.selected}
      //   />
      // );
  
      let newProps = {
        ...other,
        ref: option.props.value,
        checked: option.props.value === this.state.selected,
        name: this.props.name,
        key: option.props.value,
        value: option.props.value,
        label: option.props.label,
        onCheck: this.handleChange.bind(this),
      };
      
      return (
        React.cloneElement(option, newProps)
      )
    }, this);
    
    return (
      <div
        style={prepareStyles(Object.assign({}, this.props.style))}
        className={this.props.className}
      >
        {options}
      </div>
    );
  }
  
}
