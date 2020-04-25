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
    MDBProgress
} from 'mdbreact';
// Redux Imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { searchTasks } from "../../actions/searchActions";

export class Search extends Component {
    state = {
        tasksLoading: true,
        tasksFound: false,
        items: null,
        hasMore: null,
        totalTasks: null,
        loadedTasks: null
    }
    componentDidMount() {
        if(this.props.location.state) {
            if(this.props.location.state.searchParameter==="T"){
                this.setState({searchString: this.props.location.state.searchString})
                this.props.searchTasks({ title: this.props.location.state.searchString })
            } else {
                // Search People
            }
        }
    }
    componentWillReceiveProps(props) {
        console.log(props.location.state.searchString + " " + this.state.searchString)
        if(props.location.state.searchString!==this.state.searchString){
            this.setState({ searchString: props.location.state.searchString })
            if(props.location.state.searchParameter==="T"){
                props.searchTasks({ title: props.location.state.searchString })
            } else {
                // Search People
            }
        } else {
            this.setState({ searchString: props.location.state.searchString+" " })
            // window.location.reload();
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
        } else {
            
        }
    }

    
    render() {
        console.log(this.state)
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        FILTERS
                    </MDBRow>
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

Search.propTypes = {
    searchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    tasks: state.searchItems.tasks
});

export default connect(mapStateToProps, { searchTasks })(Search)