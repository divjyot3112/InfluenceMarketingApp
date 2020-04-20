import React, {useEffect, Component} from 'react';
import Badge from '@material-ui/core/Badge';

import './ConversationListItem.css';

class ConversationListItem extends Component {

  conversationClick = () => {
    this.props.onClick();
  }

  render() {
    let { photo, name, text, unreadCount } = this.props.data;
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
      </div>
    );
  }
}

export default ConversationListItem;