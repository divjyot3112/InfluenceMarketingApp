import React, {Component} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { fetchConversations, markRead } from "../../../actions/inboxActions";
import { connect } from "react-redux";
import './ConversationList.css';
import SearchUsers from '../SearchUsers/SearchUsers';

const MY_USER_ID = 'user2'; //TODO: add current user email
class ConversationList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allConversations: [],
      visibleConversations: [],
      currentCoverstation: []
    }
  }

  componentDidMount = () => {
    this.getConversations();
    
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('Should Component update', nextProps, "state", nextState);
    
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.conversations!==this.props.conversations){
      let newConversations = nextProps.conversations.map(c => {
        let conversationName = (c.firstUser === MY_USER_ID) ? c.secondUser : c.firstUser
        let unreadCount = c.conversation.filter(f => f.read === false).length
        return {
          photo: window.location.origin + '/dummy.png', //TODO: add profile image
          name: conversationName,
          unreadCount: unreadCount
        };
      });

       this.setState({
         allConversations: newConversations,
         visibleConversations: newConversations
       })
    }
  }

  getConversations = () => {

    this.props.fetchConversations(MY_USER_ID, () => {
      console.log(this.props.conversations)
      let newConversations = this.props.conversations.map(c => {
        let conversationName = (c.firstUser === MY_USER_ID) ? c.secondUser : c.firstUser
        let unreadCount = c.conversation.filter(f => f.read === false).length
        return {
          photo: window.location.origin + '/dummy.png', //TODO: add profile image
          name: conversationName,
          unreadCount: unreadCount
        };
      });

       this.setState({
         allConversations: newConversations,
         visibleConversations: newConversations
       })
    })
  }
  
  searchConversation = (str) => {
    if (str.trim() === "" || str === '*') {
      this.setState({
        visibleConversations: this.state.allConversations
      })
    } else {
      let filteredConversations = this.state.allConversations.filter(conversation => {
        if (conversation.name.toLowerCase().startsWith(str.toLowerCase())) return true;
        else return false;
      })

      this.setState({
        visibleConversations: filteredConversations
      })
    }
  }

  selectConversation = (key) => {
    this.setState({
      currentCoverstation:key
    })
    this.props.selectConversation(key)
    if (this.state.allConversations.filter(c => c.name === key).unreadCount != 0) {
      this.props.markRead({ current: MY_USER_ID, other: key }, () => { this.getConversations() })
    }
  }

  addNewConversation = () => {
    alert("New Conversation")
  }

  render() {
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          rightItems={[
            <SearchUsers key="add" icon="ion-ios-add-circle-outline"/>
          ]}
        />
        <ConversationSearch onSearch={this.searchConversation}/>
        {
          this.state.visibleConversations.map(conversation => {
            let isActive = false;
            if (this.state.currentCoverstation === conversation.name) {
              isActive = true;
            }
            return <ConversationListItem
              key={conversation.name}
              data={conversation}
              onClick={() => this.selectConversation(conversation.name)}
              isActive={isActive}
              unreadCount={conversation.unreadCount}
            />
          }
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      conversations: state.conversations
  };
}

export default connect(mapStateToProps, { fetchConversations, markRead })(ConversationList);