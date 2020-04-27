import React, { Component } from 'react'
import {Link} from "react-router-dom";
// import InfiniteScroll from 'react-infinite-scroller';
// UI Imports
import {
    // MDBAvatar,
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
    // MDBCardUp
    // MDBInput,
    // MDBFormInline
} from 'mdbreact';
import Avatar from '@material-ui/core/Avatar';
// import {Form} from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles';
import { MdStars } from "react-icons/md";
// Redux Imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { searchPeople } from "../../actions/searchActions";
import { getInfluencerRatings } from '../../actions/ratingActions'
// CSS
import '../../css/search.css'
// Utils
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginTop: "10%",
        marginLeft:"40%"
    }
});

export class SearchPeople extends Component {
    state = {
        colors: [
            "##F44336",
            "##EF9A9A",
            "#F48FB1",
            "#CE93D8",
            "#9575CD",
            "#7986CB",
            "#64B5F6",
            "#4DB6AC",
            "#1DE9B6",
            "#81C784",
            "#9CCC65",
            "#CDDC39",
            "#FFEB3B"
        ],
        peopleLoading: true,
        peopleFound: false,
        items: null,
        hasMore: null,
        totalPeople: null,
        loadedPeople: null,
        status: null,
        avgRatings: null
    }
    componentDidMount() {
        
        if(this.props.location.state) {
            const str = this.props.location.state.searchString.split(" ", 2)
            this.setState({searchString: this.props.location.state.searchString})
            this.props.searchPeople({ 
                firstName: str[0],
                lastName: str[1] ? str[1] : ""
            })
        }
        this.props.people.map(person => (
            this.props.getInfluencerRatings(person.email)
        ))
    }
    componentWillReceiveProps(props) {
        let { classes } = this.props;
        console.log(props.location.state.searchString + " " + this.state.searchString)
        if(props.location.state.searchString!==this.state.searchString){
            const str = props.location.state.searchString.split(" ", 2)
            this.setState({ searchString: props.location.state.searchString })
            props.searchPeople({ 
                firstName: str[0],
                lastName: str[1] ? str[1] : ""
            })
        }
        let people = props.people
        let avgRatings = {}
        
        this.setState({
            people: props.people
        })
        
        let totalPeople = props.people.length>9 ? (
            ((props.people.length-9)%6===0) ?  (props.people.length-9)/6 + 1 : (props.people.length-9)/6 + 2
        ) : 2
        let splicedPeople = []
        let size = 3
        while (people.length > 0)
            splicedPeople.push(people.splice(0, size));
        let renderPeople = []
        const sliceAndPush = (sliceSize) => {
            let sliced = splicedPeople.splice(0,sliceSize)
            console.log(splicedPeople.length)
            renderPeople.push(
                sliced.map((array) => (
                    <MDBRow>
                        {array.map(profile => (
                            <MDBCol md='4'>
                            <MDBCard style={{
                                background: this.state.colors[Math.floor(Math.random()*this.state.colors.length)]
                            }}>
                                {/* <MDBCardUp gradient='aqua' /> */}
                                <Link
                                    to={{
                                        pathname: "/profile",
                                        state: {
                                            email:profile.email
                                        }
                                    }}
                                    style={{textDecoration: 'none'}}
                                >
                                    {/* <MDBAvatar className='mx-auto white'> */}
                                    <Avatar src={profile.image} className={classes.large} />
                                </Link>
                                <span style={{alignSelf:"center"}}>
                                    <MdStars/>
                                    {avgRatings[profile.email]}
                                </span>
                                <hr/>
                                <MDBCardBody style={{textAlign:"left"}}>
                                    {profile.name.firstName + " " + profile.name.lastName}<br/>
                                    
                                    <hr />
                                    <p style={{textAlign:"left"}}>
                                        {profile.aboutMe}
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        ))}
                    </MDBRow>
                ))
            )
        }
        sliceAndPush(3)
        let hasMore = splicedPeople.length>0 ? true : false
        console.log("renderPeople len" + renderPeople.length)
        this.setState({
            items: renderPeople,
            renderPeople: renderPeople,
            splicedPeople: splicedPeople,
            hasMore: hasMore,
            totalPeople: totalPeople,
            loadedPeople: 2
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
        // this.props.searchTasks(data)
        console.log("Onclick")
        this.componentWillReceiveProps(this.props)
    }

    loadMore = () => {
        let { classes } = this.props;
        if(this.state.hasMore) {
            const sliceSize = 2
            let renderPeople = this.state.renderPeople
            let splicedPeople = this.state.splicedPeople
            let sliced = splicedPeople.splice(0,sliceSize)
            console.log("Spliced People: " + splicedPeople.length)
            console.log("renderPeople: " + renderPeople)
            
            renderPeople.push(
                sliced.map((array) => (
                    <MDBRow>
                        {array.map(profile => (
                            <MDBCol md='4'>
                            <MDBCard style={{
                                background: this.state.colors[Math.floor(Math.random()*this.state.colors.length)]
                            }}>
                                {/* <MDBCardUp gradient='aqua' /> */}
                                <Link
                                    to={{
                                        pathname: "/profile",
                                        state: {
                                            email:profile.email
                                        }
                                    }}
                                    style={{textDecoration: 'none'}}
                                >
                                    {/* <MDBAvatar className='mx-auto white'> */}
                                    <Avatar src={profile.image} className={classes.large} />
                                </Link>
                                <span style={{alignSelf:"center"}}>
                                    <MdStars/>
                                    {this.state.avgRatings[profile.email]}
                                </span>
                                <hr/>
                                <MDBCardBody style={{textAlign:"left"}}>
                                    {profile.name.firstName + " " + profile.name.lastName}<br/>
                                    
                                    <hr />
                                    <p style={{textAlign:"left"}}>
                                        {profile.aboutMe}
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        ))}
                    </MDBRow>
                ))
            )
            let temp = []
            temp.push(
                renderPeople.map((row) => (
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
            console.log("renderPeople len" + renderPeople.length)
            let hasMore = splicedPeople.length>0 ? true : false
            this.setState({
                hasMore: hasMore,
                splicedPeople: splicedPeople,
                renderPeople: temp,
                loadedPeople: this.state.loadedPeople+1
            })
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                {/* <MDBContainer>
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
                                value={this.state.loadedPeople/this.state.totalPeople*100}
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

SearchPeople.propTypes = {
    searchPeople: PropTypes.func.isRequired,
    getInfluencerRatings: PropTypes.func.isRequired,
    people: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    people: state.searchItems.people
});

export default connect(mapStateToProps, { searchPeople, getInfluencerRatings })(withStyles(useStyles)(SearchPeople))