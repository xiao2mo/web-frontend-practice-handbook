import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
export default class DropDownRight extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <polygon points="9.5,17.5 14.5,12.5 9.5,7.5 "/>
      </SvgIcon>
    );
  }
}
