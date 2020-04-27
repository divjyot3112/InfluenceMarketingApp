import React, { Component } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { sendMessage , fetchConversations} from "../../../actions/inboxActions";
import { connect } from "react-redux";
import './MessageList.css';
import {MY_USER_ID} from '../../../utils/Constants'
//const MY_USER_ID = 'user2'; //TODO: add current user email

const URL = 'ws://localhost:3030'

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  ws = new WebSocket(URL)

  shouldComponentUpdate(nextProps, nextState){
    console.log('Should Component update', nextProps, "state", nextState);
    
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.conversationId!==this.props.conversationId){
      this.getMessages(nextProps.conversationId);
    }
  }

  componentDidMount = () => {
    this.props.fetchConversations(MY_USER_ID, () =>{return}); //vk
    this.getMessages(this.props.conversationId);

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      //If you are not the receiver dont process
      if (message.receiver !== MY_USER_ID) return
      
      this.setState({ messages: [...this.state.messages, message.message] })
      
      
      //currently the conversation with the author is open so need to mark it read
      if (message.message.author === this.props.conversationId) {
        //verify
        this.props.markRead({ current: MY_USER_ID, other: message.message.author }, () => {
          this.props.fetchConversations(MY_USER_ID, () => {
            console.log(this.props.conversations)
          })
        })
      } else {
        this.props.fetchConversations(MY_USER_ID, () => {
          console.log(this.props.conversations)
        })
      }
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }



  handleSendMessage = (msg) => {
    let message = {
        author: MY_USER_ID,
        message: msg,
        timestamp: new Date().getTime(),
        read: false
    }
    let data = {
      sender:MY_USER_ID,
      receiver: this.props.conversationId,
      message: message
    }
    this.props.sendMessage(data, () => {
      this.props.fetchConversations(MY_USER_ID, () => {
        console.log(this.props.conversations)
      })
    })
    this.ws.send(JSON.stringify(data))
    this.setState({ messages: [...this.state.messages, message] })
  }


  getMessages = (c_id) => {
    if (this.props.conversations.filter(c => c.firstUser === c_id || c.secondUser === c_id).length <= 0) {
      this.setState({
        messages: []
      })
    }
    else {
      this.props.conversations.map((c) => {
        if (c.firstUser === c_id || c.secondUser === c_id) {
          this.setState({
            messages: c.conversation
          })
        }
      })
    }
  }

  renderMessages = () => {
    let i = 0;
    let messageCount = this.state.messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  render() {
    return (
      <div className="message-list">
        <Toolbar
        />

        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]} handleSendMessage={this.handleSendMessage}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      conversations: state.conversations
  };
}

export default connect(mapStateToProps, { sendMessage, fetchConversations })(MessageList);