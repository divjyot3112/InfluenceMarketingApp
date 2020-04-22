import React, { Component } from 'react'
// Importing UI components
// CSS
import "../../css/taskDescription.css" 
// import { Carousel, } from 'react-bootstrap'
import task_image from './task_image.JPEG'

export class TaskDescription extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="nested" style={{background:"#ddd"}}>
                        <div className="imgdiv">
                            <img src={task_image} alt="No images for this task" />
                            {/* Hello */}
                        </div>
                        <div className="title">
                            TITLE
                        </div>
                        <div className="description">
                            DESCRIPTION
                        </div>
                        <div className="company_details">
                            COMPANY<br/>
                            CATEGORY<br/>
                            SPONSOR PROFILE
                        </div>
                    </div>
                    <div style={{background:"#eee"}}>
                        <div className="nested2">
                            <div className="job_details">
                                JOB ID<br/>
                                JOB STATUS<br/>
                                POSTED ON<br/>
                                START DATE<br/>
                                END DATE
                            </div>
                            <div className="list">
                                Hello
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskDescription
