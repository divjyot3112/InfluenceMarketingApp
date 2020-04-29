import React, {Component} from 'react'
import {Link} from "react-router-dom";
// Importing UI components
import {
    MDBInput
} from 'mdbreact'
// import { Carousel, } from 'react-bootstrap'
// CSS
import "../../css/taskDescription.css"
// Redux imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getTask} from "../../actions/taskActions";

export class TaskDescription extends Component {
    state = {
        loadingScreen: true,
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.props.getTask(this.props.location.state)
            this.setState({
                loadingScreen: false
            })
        } else if (window.location.href.substring(window.location.href.lastIndexOf('/') + 1) !== "task") {
            const data = {
                taskId: window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
            }
            this.setState({
                loadingScreen: false
            })
            this.props.getTask(data)
        } else {
            this.setState({
                loadingScreen: true
            })
        }
    }

    render() {
        const {task} = this.props;
        const t = ((task || {}).task || {})
        let selected = false;
        let renderSelectedCandidates = []
        if (t.selectedCandidates) {
            t.selectedCandidates.forEach(candidate => {
                if (candidate === localStorage.getItem('email')) {
                    selected = true;
                }
            });
        }
        if (selected) {
            t.selectedCandidates.forEach(candidate => {
                renderSelectedCandidates.push(
                    <div>
                        {candidate}
                    </div>
                )
            });
        } else {

        }
        console.log(t)
        return (
            <div>
                <div className="wrapper">
                    <div className="nested">
                        <div className="imgdiv">
                            <img src={t.image} alt="No images for this task"/>
                            {/* Hello */}
                        </div>
                        <div className="title">
                            <b>Title: </b><MDBInput value={t.title}/><br/>
                            {t.category}
                        </div>
                        <div className="description">
                            <b>Description: </b>{t.description}
                        </div>
                        <div className="company_details">
                            <b>Task Posted by: </b>
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
                    <div className="nested2">
                        <div className="job_details">
                            <b>Task ID:</b>{t._id}
                            <b>Task Status:</b>{t.status}
                            <b>Task Posted on:</b>{t.postedOn}
                            <b>Start Date:</b>{t.startDate}
                            <b>End Date:</b>{t.endDate}
                        </div>
                        <div className="list" style={{display: selected ? 'block' : 'none'}}>
                            <b>Selected Candidates:</b>
                            {renderSelectedCandidates}
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

export default connect(mapStateToProps, {getTask})(TaskDescription)
