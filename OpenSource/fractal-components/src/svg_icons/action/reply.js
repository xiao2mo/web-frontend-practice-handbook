import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

export default class Reply extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
       <path d="M3,20c2.5-3.5,6-5.1,11-5.1V19l7-7l-7-7v4C7,10,4,15,3,20z"/>
      </SvgIcon>
    );
  }
}
