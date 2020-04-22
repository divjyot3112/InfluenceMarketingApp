import React, {Component} from 'react'
import { Empty } from 'antd';
import "../../css/dashboard.css";

class NoData extends Component {
  render() {
      return (
        <div className="empty">
              <img className="empty_image" src={this.props.image}></img>
              <h5>No matching tasks found!</h5>
      </div>
    )
  }
}

export default NoData;