import React, { Component } from 'react'
import {Link} from "react-router-dom";
// import InfiniteScroll from 'react-infinite-scroller';
// UI Imports
import {
    MDBBtn,
    MDBCard,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCardBody,
    MDBProgress,
    // MDBInput,
    // MDBFormInline
} from 'mdbreact';
// import {Form} from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles';

// Redux Imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { searchTasks } from "../../actions/searchActions";
// CSS
import '../../css/search.css'
// Utils
import { TaskStatus } from '../../utils/Constants'
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    }
});

export class SearchTasks extends Component {
    state = {
        tasksLoading: true,
        tasksFound: false,
        items: null,
        hasMore: null,
        totalTasks: null,
        loadedTasks: null,
        status: null
    }
    componentDidMount() {
        if(this.props.location.state) {
            this.setState({searchString: this.props.location.state.searchString})
            this.props.searchTasks({ 
                title: this.props.location.state.searchString,
                status: this.props.location.state.status
            })
        }
    }
    componentWillReceiveProps(props) {
        console.log(props.location.state.searchString + " " + this.state.searchString)
        if(props.location.state.searchString!==this.state.searchString){
            this.setState({ searchString: props.location.state.searchString })
            props.searchTasks({ 
                title: props.location.state.searchString,
                status: props.location.state.status
            })
        }
        if(props.tasks) {
            this.setState({
                tasks: props.tasks
            })
        }
        let tasks = props.tasks
        let totalTasks = props.tasks.length>9 ? (
            ((props.tasks.length-9)%6===0) ?  (props.tasks.length-9)/6 + 1 : (props.tasks.length-9)/6 + 2
        ) : 2
        let splicedTasks = []
        let size = 3
        while (tasks.length > 0)
            splicedTasks.push(tasks.splice(0, size));
        let renderTasks = []
        const sliceAndPush = (sliceSize) => {
            let sliced = splicedTasks.splice(0,sliceSize)
            console.log(splicedTasks.length)
            renderTasks.push(
                sliced.map((array) => (
                    <MDBRow>
                        {array.map(task => (
                            <MDBCol>
                            <MDBCard 
                                style={{ width: "22rem" }}
                                border="true"
                            >
                                <Link
                                    to={{
                                        pathname: "/task",
                                        state: {
                                            taskId: task._id
                                        }
                                    }}
                                    style={{textDecoration: 'none'}}
                                >
                                    <MDBCardImage
                                        className="img-fluid"
                                        src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                                        waves
                                    />
                                </Link>
                                <MDBCardBody>
                                    <MDBCardTitle>{task.title}</MDBCardTitle>
                                    <MDBCardText>
                                        <b>Task Category: </b> {task.category} <br/>
                                        <b>Posted by: </b> 
                                        <Link
                                            to={{
                                                pathname: "/profile",
                                                state: {
                                                    email: task.postedBy
                                                }
                                            }}
                                            style={{textDecoration: 'none'}}
                                        >
                                            {task.postedBy}
                                        </Link> <br/>
                                        <b>Task Status: </b> {task.status}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        ))}
                    </MDBRow>
                ))
            )
        }
        sliceAndPush(3)
        let hasMore = splicedTasks.length>0 ? true : false
        console.log("renderTask len" + renderTasks.length)
        this.setState({
            items: renderTasks,
            renderTasks: renderTasks,
            splicedTasks: splicedTasks,
            hasMore: hasMore,
            totalTasks: totalTasks,
            loadedTasks: 2
        })
    }

    filterClick = (status) => () => {
        this.setState({
            status: status
        })
        const data = {
            title: this.state.searchString,
            status: status
        }
        this.props.searchTasks(data)
        console.log("Onclick")
        this.componentWillReceiveProps(this.props)
    }

    loadMore = () => {
        if(this.state.hasMore) {
            const sliceSize = 2
            let renderTasks = this.state.renderTasks
            let splicedTasks = this.state.splicedTasks
            let sliced = splicedTasks.splice(0,sliceSize)
            console.log("Spliced Tasks: " + splicedTasks.length)
            console.log("renderTasks: " + renderTasks)
            
            renderTasks.push(
                sliced.map((array) => (
                    <MDBRow>
                        {array.map(task => (
                            <MDBCol>
                            <MDBCard 
                                style={{ width: "22rem" }}
                                border="true"
                            >
                                <Link
                                    to={{
                                        pathname: "/task",
                                        state: {
                                            taskId: task._id
                                        }
                                    }}
                                    style={{textDecoration: 'none'}}
                                >
                                    <MDBCardImage
                                        className="img-fluid"
                                        src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                                        waves
                                    />
                                </Link>
                                <MDBCardBody>
                                    <MDBCardTitle>{task.title}</MDBCardTitle>
                                    <MDBCardText>
                                        <b>Task Category: </b> {task.category} <br/>
                                        <b>Posted by: </b> 
                                        <Link
                                            to={{
                                                pathname: "/profile",
                                                state: {
                                                    email: task.postedBy
                                                }
                                            }}
                                            style={{textDecoration: 'none'}}
                                        >
                                            {task.postedBy}
                                        </Link> <br/>
                                        <b>Task Status: </b> {task.status}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        ))}
                    </MDBRow>
                ))
            )
            let temp = []
            temp.push(
                renderTasks.map((row) => (
                    <div>
                    {row.map(data => (
                        data
                    ))}
                    </div>
                ))
            )
            this.setState({
                items: temp
            })
            console.log("items:" + this.state.items)
            console.log("renderTask len" + renderTasks.length)
            let hasMore = splicedTasks.length>0 ? true : false
            this.setState({
                hasMore: hasMore,
                splicedTasks: splicedTasks,
                renderTasks: temp,
                loadedTasks: this.state.loadedTasks+1
            })
        }
    }

    
    render() {
        const { classes } = this.props;
        console.log(this.state)
        return (
            <div>
                <MDBContainer>
                <FormControl className={classes.formControl}>
                <RadioGroup row aria-label="position" name="position" defaultValue="end" 
                // onChange={(event)=>this.filterClick(event)}
                >
                    <FormControlLabel
                        value={TaskStatus.CREATED}
                        control={<Radio color="primary" />}
                        label={TaskStatus.CREATED}
                        labelPlacement="end"
                        checked={this.state.status===TaskStatus.CREATED ? true : false}
                        onClick={this.filterClick(TaskStatus.CREATED)}
                    />
                    <FormControlLabel
                        value={TaskStatus.PENDING}
                        control={<Radio color="primary" />}
                        label={TaskStatus.PENDING}
                        labelPlacement="end"
                        checked={this.state.status===TaskStatus.PENDING ? true : false}
                        onClick={this.filterClick(TaskStatus.PENDING)}
                    />
                    <FormControlLabel
                        value={TaskStatus.INPROGRESS}
                        control={<Radio color="primary" />}
                        label={TaskStatus.INPROGRESS}
                        labelPlacement="end"
                        checked={this.state.status===TaskStatus.INPROGRESS ? true : false}
                        onClick={this.filterClick(TaskStatus.INPROGRESS)}
                    />
                    <FormControlLabel
                        value={TaskStatus.COMPLETED}
                        control={<Radio color="primary" />}
                        label={TaskStatus.COMPLETED}
                        labelPlacement="end"
                        checked={this.state.status===TaskStatus.COMPLETED ? true : false}
                        onClick={this.filterClick(TaskStatus.COMPLETED)}
                    />
                    <FormControlLabel
                        value={TaskStatus.ALL}
                        control={<Radio color="primary" />}
                        label={TaskStatus.ALL}
                        labelPlacement="end"
                        checked={this.state.status===TaskStatus.ALL ? true : false}
                        onClick={this.filterClick(TaskStatus.ALL)}
                    />
                </RadioGroup>
                </FormControl>
                </MDBContainer>
                {/* <MDBContainer className="list">
                        <label className="container">{TaskStatus.CREATED}
                            <input
                                type="radio"
                                onClick={this.filterClick(TaskStatus.CREATED)}
                                checked={this.state.status===TaskStatus.CREATED ? true : false}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">{TaskStatus.PENDING}
                            <input
                                type="radio"
                                onClick={this.filterClick(TaskStatus.PENDING)}
                                checked={this.state.status===TaskStatus.PENDING ? true : false}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">{TaskStatus.INPROGRESS}
                            <input
                                type="radio"
                                onClick={this.filterClick(TaskStatus.INPROGRESS)}
                                checked={this.state.status===TaskStatus.INPROGRESS ? true : false}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">{TaskStatus.COMPLETED}
                            <input
                                type="radio"
                                onClick={this.filterClick(TaskStatus.COMPLETED)}
                                checked={this.state.status===TaskStatus.COMPLETED ? true : false}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">{TaskStatus.ALL}
                            <input
                                type="radio"
                                onClick={this.filterClick(TaskStatus.ALL)}
                                checked={this.state.status===TaskStatus.ALL ? true : false}
                            />
                            <span className="checkmark"></span>
                        </label>
                </MDBContainer> */}
                <MDBContainer>
                    {this.state.items}
                    <MDBRow 
                        id="loadingButton" 
                        center
                        style={{marginTop:"0.5%", display:this.state.hasMore ? "block" : "none"}}
                    >
                        <MDBCol>
                            <MDBBtn color="dark" onClick = {this.loadMore}>
                                Load More
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{marginTop:"2%"}}>
                        <MDBCol>
                            <MDBProgress 
                                material
                                value={this.state.loadedTasks/this.state.totalTasks*100}
                                heigth="20px"
                                style={{}}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

SearchTasks.propTypes = {
    searchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    tasks: state.searchItems.tasks
});

export default connect(mapStateToProps, { searchTasks })(withStyles(useStyles)(SearchTasks))