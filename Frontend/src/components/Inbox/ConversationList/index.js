import React, {Component} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import { fetchConversations, markRead } from "../../../actions/inboxActions";
import { connect } from "react-redux";
import './ConversationList.css';
import SearchUsers from '../SearchUsers/SearchUsers';
//import {MY_USER_ID} from '../../../utils/Constants'
const MY_USER_ID = localStorage.getItem("email"); //TODO: add current user email
class ConversationList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allConversations: [],
      visibleConversations: [],
      currentConverstation: [],
      chatWith: this.props.chatWith
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
        let unreadCount = c.conversation.filter(f => f.author!== MY_USER_ID && f.read === false).length
        return {
          photo: c.photo, //TODO: add profile image
          email: conversationName,
          unreadCount: unreadCount,
          name: c.name,
        };
      });

       this.setState({
         allConversations: newConversations,
         visibleConversations: newConversations
       }, () => {
        if (this.state.chatWith !== null) {
          if (this.state.allConversations.filter(c => c.email === this.state.chatWith.email).length > 0) {
            this.selectConversation(this.state.chatWith.email)
          }
          else {
            this.addNewConversation(this.state.chatWith)
          }
        } else {
          if(newConversations.length > 0)
            this.selectConversation(newConversations[0].email)
        }
      })
    }
  }

  getConversations = () => {

    this.props.fetchConversations(MY_USER_ID, () => {
      console.log(this.props.conversations)
      let newConversations = this.props.conversations.map(c => {
        let unreadCount = c.conversation.filter(f => f.author !== MY_USER_ID && f.read === false).length
        return {
          photo: c.photo, //TODO: add profile image
          name: c.name,
          email: c.email,
          unreadCount: unreadCount
        };
      });
      
      this.setState({
        allConversations: newConversations,
        visibleConversations: newConversations
      }, () => {
        if (this.state.chatWith !== null) {
          if (this.state.allConversations.filter(c => c.email === this.state.chatWith.email).length > 0) {
            this.selectConversation(this.state.chatWith.email)
          }
          else {
            this.addNewConversation(this.state.chatWith)
          }
        } else {
          if(newConversations.length > 0)
            this.selectConversation(newConversations[0].email)
        }
      }
      )
       
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
      currentConverstation: key
    })
    this.props.selectConversation(key)
    if (this.state.allConversations.filter(c => c.email === key)[0].unreadCount !== 0) {
      this.props.markRead({ current: MY_USER_ID, other: key }, () => { this.getConversations() })
    }
  }

  addNewConversation = (userData) => {
    if (this.state.allConversations.filter(c => c.email === userData.email).length <= 0) {
        let newConversation = {
          photo: userData.photo, //TODO: add profile image
          name: userData.name,
          unreadCount: 0,
          email: userData.email
        };
      this.setState({
        allConversations: [newConversation, ...this.state.allConversations],
        visibleConversations: [newConversation, ...this.state.visibleConversations],
        currentConverstation: userData.email
      },this.props.selectConversation(userData.email))
    }
    else {
      this.selectConversation(userData.email)
    }
  }

  render() {
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          rightItems={[
            <SearchUsers key="add" icon="ion-ios-add-circle-outline" onNewConversationSelected={(userData)=>this.addNewConversation(userData)}/>
          ]}
        />
        <ConversationSearch onSearch={this.searchConversation}/>
        {
          this.state.visibleConversations.map(conversation => {
            let isActive = false;
            if (this.state.currentConverstation === conversation.email) {
              isActive = true;
            }
            return <ConversationListItem
              key={conversation.name}
              data={conversation}
              onClick={() => this.selectConversation(conversation.email)}
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