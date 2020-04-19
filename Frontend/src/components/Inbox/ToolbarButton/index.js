import React, { Component } from 'react';
import './ToolbarButton.css';

class ToolbarButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { icon } = this.props;
    return (
      <i className={`toolbar-button ${icon}`} />
    );
  }
}

export default ToolbarButton;