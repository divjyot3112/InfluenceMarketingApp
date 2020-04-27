import React, { Component } from 'react'
import {Link} from "react-router-dom";
// import InfiniteScroll from 'react-infinite-scroller';
// UI Imports
import {
    // MDBAvatar,
    MDBBtn,
    MDBCard,
    MDBCol,
    MDBRow,
    MDBContainer,
    MDBCardBody,
    MDBProgress,
    MDBIcon,
} from 'mdbreact';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import {Form} from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles';
import { MdStars } from "react-icons/md";
// Redux Imports
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { searchPeople, searchPeopleWithAddress, searchPeopleSortedZA, searchPeopleSortedAZ } from "../../actions/searchActions";
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
        ratingsMap: null,
        filter: ""
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
    }
    componentWillReceiveProps(props) {
        let { classes } = this.props;
        console.log(props.location.state.searchString + " " + this.state.searchString)
        if(props.location.state.searchString!==this.state.searchString){
            const str = props.location.state.searchString.split(" ", 2)
            this.setState({ searchString: props.location.state.searchString })
            props.searchPeople({
                firstName: str[0],
                lastName: str[1] ? str[1] : "a"
            })
        }
        let address = props.location.state.address
        let ratingsMap = props.ratingsMap
        let people = props.people
        
        this.setState({
            people: people,
            ratingsMap: ratingsMap,
            address: address
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
                                <div style={{alignSelf:"center"}}>
                                    <MdStars/>
                                    {console.log(ratingsMap[profile.email])}
                                    {
                                        ratingsMap[profile.email]===null || ratingsMap[profile.email]===undefined ? 
                                        null :
                                        (
                                            ratingsMap[profile.email]%1===0 ? ratingsMap[profile.email] :
                                            (Math.round(ratingsMap[profile.email]*100)/100).toFixed(2)
                                        )
                                    }
                                </div>
                                <hr/>
                                <MDBCardBody style={{textAlign:"left"}}>
                                    {profile.name.firstName + " " + profile.name.lastName}<br/>
                                    <div>
                                    <Link to={{
                                        pathname: "/inbox",
                                        state: {
                                            chatWith: { 
                                                email:"vandana@gmail.com", 
                                                name:"Vandana Shenoy", 
                                                photo:profile.image
                                            }
                                        }
                                    }}
                                    style={{display: 
                                        profile.email===localStorage.getItem("email") ? "none" : "block"
                                    , textDecoration: 'none', textAlign:"right" }}><MDBBtn>Chat
                                        <MDBIcon icon="comment" className="ml-1" /></MDBBtn></Link> 
                                    <span style={{textAlign:"left"}}>
                                        {profile.aboutMe}
                                    </span>
                                    </div>
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

    filterClick = (e) => {
        this.setState({
            filter: e.target.value
        })
        if(e.target.value==="alphaza") {
            const str = this.state.searchString.split(" ", 2)
            const data = {
                firstName: str[0],
                lastName: str[1] ? str[1] : "a",
                // address: this.state.address
            }
            this.props.searchPeopleSortedZA(data)
            this.componentWillReceiveProps(this.props)
        }
        if(e.target.value==="alphaaz") {
            const str = this.state.searchString.split(" ", 2)
            const data = {
                firstName: str[0],
                lastName: str[1] ? str[1] : "a",
                // address: this.state.address
            }
            this.props.searchPeopleSortedAZ(data)
            this.componentWillReceiveProps(this.props)
        }
        if(e.target.value==="address") {
            const str = this.state.searchString.split(" ", 2)
            const data = {
                firstName: str[0],
                lastName: str[1] ? str[1] : "a",
                address: this.state.address
            }
            this.props.searchPeopleWithAddress(data)
            this.componentWillReceiveProps(this.props)
        }
        if(e.target.value==="") {
            const str = this.state.searchString.split(" ", 2)
            const data = {
                firstName: str[0],
                lastName: str[1] ? str[1] : "a",
                // address: this.state.address
            }
            this.props.searchPeople(data)
            this.componentWillReceiveProps(this.props)
        }
    }

    loadMore = () => {
        let { classes } = this.props;
        if(this.state.hasMore) {
            const sliceSize = 2
            let renderPeople = this.state.renderPeople
            let ratingsMap = this.state.ratingsMap
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
                                <div style={{alignSelf:"center"}}>
                                    <MdStars/>
                                    {
                                        ratingsMap[profile.email]===null ? null :
                                        (
                                            ratingsMap[profile.email]%1===0 ? ratingsMap[profile.email] :
                                            (Math.round(ratingsMap[profile.email]*100)/100).toFixed(2)
                                        )
                                    }
                                </div>
                                <hr/>
                                <MDBCardBody style={{textAlign:"left"}}>
                                    {profile.name.firstName + " " + profile.name.lastName}<br/>
                                    <div>
                                    <Link to={{
                                        pathname: "/inbox",
                                        state: {
                                            chatWith: { email: "vandana2@gmail.com", name: "Vandana2 ABC",photo:"url"}
                                        }
                                    }}
                                    style={{display: 
                                        profile.email===localStorage.getItem("email") ? "none" : "block"
                                    , textDecoration: 'none', textAlign:"right" }}><MDBBtn>Chat
                                        <MDBIcon icon="comment" className="ml-1" /></MDBBtn></Link> 
                                    <span style={{textAlign:"left"}}>
                                        {profile.aboutMe}
                                    </span>
                                    </div>
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
        const { classes } = this.props;
        console.log(this.state)
        return (
            <div>
                <MDBContainer>
                <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Enhance your search
                </InputLabel>
                <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    value={this.state.filter}
                    onChange={(e) => this.filterClick(e)}
                    displayEmpty
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="alphaaz">Sort Alphabetically (a-z)</MenuItem>
                    <MenuItem value="alphaza">Sort Alphabetically (z-a)</MenuItem>
                    <MenuItem value="address">Search Near Your Area</MenuItem>
                </Select>
                </FormControl>
                </MDBContainer>
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
    ratingsMap: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    people: state.searchItems.people,
    ratingsMap: state.searchItems.ratingsMap
});

export default connect(mapStateToProps, { 
    searchPeople, getInfluencerRatings, searchPeopleWithAddress, searchPeopleSortedZA, searchPeopleSortedAZ
})(withStyles(useStyles)(SearchPeople))