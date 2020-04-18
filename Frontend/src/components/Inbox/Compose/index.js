import React, { Component } from 'react';
import './Compose.css';

class Compose extends Component {

  onsendMessage = (event) => {
    if (event.keyCode === 13) {
      this.props.handleSendMessage(event.target.value);
      event.target.value = ''
    }
  }

  render() {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          onKeyUp = {(event) => this.onsendMessage(event)}
        />

        {
          this.props.rightItems
        }
      </div>
    );
  }
}

export default Compose;