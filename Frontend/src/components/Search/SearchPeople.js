import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "../../css/search.css";
import {Link} from "react-router-dom";
import {searchPeople, sortUsers} from "../../actions/searchActions";
import NoData from "../Dashboard/NoData";
import Pagination from "../Common/pagination";
import {paginate} from "../Common/paginate";
import {If} from "react-if";
import Button from "@material-ui/core/Button";
import StarRatings from 'react-star-ratings';
import {getEmailFromLocalStorage} from "../Common/auth";

const useStyles = (theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(5),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    }
});

class SearchPeople extends Component {

    state = {
        currentPage: 1,
        pageSize: 12,
        searchString: ""
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleChangeSelect = (event) => {
        let sortBy = event.target.value;
        this.props.sortUsers(sortBy);
        this.forceUpdate();
    }

    componentDidMount() {
        if (this.props.location.state) {
            const name = this.props.location.state.searchString.split(" ", 2)
            this.setState({searchString: this.props.location.state.searchString})

            this.props.searchPeople({
                firstName: name[0],
                lastName: name[1] ? name[1] : null,
                email: getEmailFromLocalStorage()
            })
        }
    }

    truncate = (input) => input && input.length > 30 ? `${input.substring(0, 30)}...` : input

    componentWillReceiveProps(props) {
        if (props.location.state.searchString !== this.state.searchString) {
            const name = props.location.state.searchString.split(" ", 2)
            this.setState({searchString: props.location.state.searchString});

            props.searchPeople({
                firstName: name[0],
                lastName: name[1] ? name[1] : null,
                email: getEmailFromLocalStorage()
            })
        }
    }

    renderProfiles() {

        const {classes} = this.props;

        if (this.props.people && this.props.people.length > 0) {
            const paginatedData = paginate(
                this.props.people ? this.props.people : "",
                this.state.currentPage,
                this.state.pageSize
            );

            return _.map(paginatedData, (user) => {

                return (
                    <Grid item key={user} xs={10} sm={6} md={3}> {/*md was 4*/}
                        <Card className={classes.card}>

                            <CardMedia
                                className={classes.cardMedia}
                                image={(user.image === null || user.image === undefined) ? window.location.origin + '/NoImageFound.jpg' : user.image}
                                title={user.email}
                            />

                            <CardContent className={classes.cardContent}>
                                <CardActions>
                                    <Link
                                        to={{
                                            pathname: "/profile",
                                            state: {
                                                email: user.email
                                            }
                                        }}
                                        style={{textDecoration: "none"}}
                                    >
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {user.name.firstName} {user.name.lastName}
                                        </Typography>
                                        <If condition={this.props.avgRatings}>
                                            <div className="average-ratings">
                                                <StarRatings
                                                    rating={this.props.avgRatings ?
                                                        Number(this.props.avgRatings[user.email] == null
                                                            ? 0 : this.props.avgRatings[user.email])
                                                        : 0}
                                                    starRatedColor="#FAAD1C"
                                                    numberOfStars={5}
                                                    starDimension="20"
                                                    starSpacing="0"
                                                />
                                            </div>
                                        </If>
                                        <br/>
                                        <br/>
                                    </Link>
                                </CardActions>

                                <If condition={user.aboutMe}>
                                    <Typography>
                                        <div style={{overflowWrap: "break-word"}}>
                                            <i>"{this.truncate(user.aboutMe)}"</i></div>
                                    </Typography>
                                </If>
                                <br/>

                                <Typography>
                                    <b>Number of Followers:</b> {user.followersCount ? user.followersCount : "NA"}
                                </Typography><br/>

                            </CardContent>

                            <CardActions>
                                <Link
                                    to={{
                                        pathname: "/inbox",
                                        state: {
                                            chatWith: {
                                                email: user.email,
                                                name: user.name.firstName + " " + user.name.lastName,
                                                photo: user.image
                                            }
                                        }
                                    }}
                                    style={{textDecoration: 'none'}}
                                >
                                    <Button color="primary">Chat &nbsp; <i
                                        className="fas fa-comment"></i></Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })
        } else {
            return <NoData image={window.location.origin + "/no_tasks.png"} description="No Profiles Found"/>

        }
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <div className="filter">
                    <div style={{float: "right", display: "inline"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Sort By</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                onChange={this.handleChangeSelect}
                            >
                                <MenuItem value={0}>Alphabetically: A-Z</MenuItem>
                                <MenuItem value={1}>Alphabetically: Z-A</MenuItem>
                                <MenuItem value={2}>Ratings: Low to High</MenuItem>
                                <MenuItem value={3}>Ratings: High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <br/>
                    <br/>
                    <br/>
                    <Grid container spacing={4}>
                        {this.renderProfiles()}
                    </Grid>
                    <br/>
                    <br/>
                    <div className="general-pagination">
                        <Pagination
                            itemsCount={this.props.tasks ? this.props.tasks.length : ""}
                            pageSize={this.state.pageSize}
                            onPageChange={this.handlePageChange}
                            currentPage={this.state.currentPage}
                        />
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

SearchPeople.propTypes = {
    classes: PropTypes.object.isRequired,
    searchPeople: PropTypes.func.isRequired,
    sortUsers: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        people: state.searchItems.people,
        avgRatings: state.searchItems.avgRatings,
    };
}

export default connect(mapStateToProps, {
    searchPeople, sortUsers
})(withStyles(useStyles)(SearchPeople));