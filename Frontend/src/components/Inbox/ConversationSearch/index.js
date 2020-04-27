import React, { Component } from 'react';
import './ConversationSearch.css';

class ConversationSearch extends Component {


  onSearch = (event) => {
    this.props.onSearch(event.target.value);
  }

  render() {
    return (
      <div className="conversation-search">
        <input
          type="search"
          className="conversation-search-input"
          placeholder="Search Conversations"
          onKeyUp = {(event) => this.onSearch(event)}
        />
      </div>
    );
  }
}

export default ConversationSearch;