import React, {Component} from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import {Redirect} from "react-router";
import {getEmailFromLocalStorage} from "../../Common/auth";

class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentConversationId: null
        }
    }

    selectConversation = (key) => {
        this.setState({
            currentConversationId: key
        })
    }

    render() {
        let redirectVar = null;
        if (!getEmailFromLocalStorage()) {
            redirectVar = <Redirect to="/"/>;
        }

        let chatWith = null
        if (this.props.location && this.props.location.state) chatWith = this.props.location.state.chatWith
        window.history.pushState(null, '')
        return (
            <div className="messenger">
                {redirectVar}
                <div className="scrollable sidebar">
                    <ConversationList selectConversation={(key) => this.selectConversation(key)} chatWith={chatWith}/>
                </div>

                <div className="scrollable content">
                    <MessageList conversationId={this.state.currentConversationId}/>
                </div>
            </div>
        );
    }
}

export default Messenger;