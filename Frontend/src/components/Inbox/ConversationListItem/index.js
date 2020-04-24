import React, {useEffect, Component} from 'react';
import Badge from '@material-ui/core/Badge';

import './ConversationListItem.css';

class ConversationListItem extends Component {

  conversationClick = () => {
    this.props.onClick();
  }

  render() {
    let { photo, name, text, unreadCount , role} = this.props.data;
    let roleBadge = (role !== null && role !== undefined) ? <span title={role} class="badge badge-danger ml-2">{role[0]}</span> : null;
    if (photo === null || photo === undefined) photo = window.location.origin + '/dummy.png';
    let className = "conversation-list-item"
    if (this.props.isActive) {
      className+="-active"
    }
    return (
      <div className={className} onClick={this.conversationClick}>
        <img className="conversation-photo" src={photo} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{name}</h1>
          {/*<p className="conversation-snippet">{text}</p>*/}
        </div>
        <Badge style={{ marginLeft: "auto", marginRight: "10px" }} badgeContent={unreadCount} color="primary"></Badge>
        
        {roleBadge}
      </div>
    );
  }
}

export default ConversationListItem;