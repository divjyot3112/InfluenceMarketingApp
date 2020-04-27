import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

class Messenger extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentConversationId:null
    }
  }

  selectConversation = (key) => {
    this.setState({
        currentConversationId: key
      })
  }

  render() {
    console.log(this.props)
    let chatWith = null
    if (this.props.location && this.props.location.state) chatWith = this.props.location.state.chatWith
    window.history.pushState(null,'')
    return (
      <div className="messenger">

        <div className="scrollable sidebar">
          <ConversationList selectConversation={(key) => this.selectConversation(key)} chatWith={chatWith}/>
        </div>

        <div className="scrollable content">
          <MessageList conversationId={this.state.currentConversationId} />
        </div>
      </div>
    );
  }
}

export default Messenger;