import React, { Component } from 'react'
import {Link} from "react-router-dom";
// Importing UI components
// import { Carousel, } from 'react-bootstrap'
import task_image from './task_image.JPEG'
// CSS
import "../../css/taskDescription.css" 
// Redux imports
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTask } from "../../actions/taskActions";

export class TaskDescription extends Component {
    state = {
        task: null
    }
    componentDidMount() {
        if(this.props.location.state) {
            this.props.getTask(this.props.location.state)
        } else {
            const data = {
                taskId: window.location.href.substring(window.location.href.lastIndexOf('/')+1)
            }
            this.props.getTask(data)
        }        
    }
    render() {
        const { task }  = this.props;
        const t = ((task || {}).task || {})
        console.log(t.postedBy)
        return (
            <div>
                <div className="wrapper">
                    <div className="nested" style={{background:"#ddd"}}>
                        <div className="imgdiv">
                            <img src={task_image} alt="No images for this task" />
                            {/* Hello */}
                        </div>
                        <div className="title">
                            <b>{t.title}</b>
                        </div>
                        <div className="description">
                            {t.description}
                        </div>
                        <div className="company_details">
                            {t.category}
                            <Link
                                to={{
                                    pathname: "/profile",
                                    state: {
                                        email: t.postedBy
                                    }
                                }}
                                style={{textDecoration: 'none'}}
                            >
                                {t.postedBy}
                            </Link>
                        </div>
                    </div>
                    <div style={{background:"#eee"}}>
                        <div className="nested2">
                            <div className="job_details">
                                {t._id}<br/>
                                {t.status}<br/>
                                {t.postedOn}<br/>
                                {t.startDate}<br/>
                                {t.endDate}
                            </div>
                            <div className="list">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TaskDescription.propTypes = {
    getTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    task: state.task
});

export default connect(mapStateToProps, { getTask })(TaskDescription)
