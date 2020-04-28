import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSponsorRatings, sortRatingsLowToHigh, sortRatingsHighToLow} from "../../actions/ratingActions";
import "../../css/sponsorRating.css";
import {Link} from "react-router-dom";
import Pagination from "../Common/pagination";
import {paginate} from "../Common/paginate";
import StarRatings from "react-star-ratings";
import CircularProgress from '@material-ui/core/CircularProgress';
import {Else, If, Then} from "react-if";


class SponsorRating extends Component {
    state = {
        currentPage: 1,
        pageSize: 5,
        loading: true
    };


    componentDidMount() {
        // TODO: Get sponsor email from local storage
        const email = "sheena@gmail.com";

        this.props.getSponsorRatings(email).then((response) => {
            this.setState({loading: false});
        });
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleRatingSorting = (e) => {
        if (e.target.value === "lowToHigh") {
            this.props.sortRatingsLowToHigh(this.props.ratings);
        } else if (e.target.value === "highToLow") {
            this.props.sortRatingsHighToLow(this.props.ratings);
        } else if (e.target.value === "mostRecent") {
            window.location.reload();
        }
        this.forceUpdate();
    };

    render() {
        // TODO: if user is not logged in, redirect to home

        const {ratings} = this.props;
        const data = Object.keys(ratings)

        const paginatedData = paginate(
            data ? data : "",
            this.state.currentPage,
            this.state.pageSize
        );

        if (Object.keys(ratings).length === 0) {
            return (
                <React.Fragment>
                    <div className="main-ratings-sponsor">
                        <If condition={this.state.loading}>
                            <Then>
                                <p className="ratings-not-found">
                                    <CircularProgress/>
                                    <CircularProgress color="secondary"/>
                                </p>
                            </Then>
                            <Else>
                                <p className="ratings-not-found">No Ratings Found</p>
                            </Else>
                        </If>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="main-ratings-sponsor">
                        <div className="sorting-options">
                            <select
                                className="form-control"
                                name="sorting"
                                id="sorting"
                                onChange={this.handleRatingSorting}
                            >
                                <option value="mostRecent">Sort by: Most Recent</option>
                                <option value="lowToHigh">Rating: Low to High</option>
                                <option value="highToLow">Rating: High to Low</option>
                            </select>

                        </div>
                        <br/>
                        <hr/>
                        <br/>
                        <div className="ratings-cards-main">
                            {paginatedData.map(key => (

                                <div className="rating-card">
                                    <div className="rating-card-left">
                                        <h4 className="card-title">Rating: {ratings[data[key]].rating}</h4>
                                        <StarRatings
                                            rating={Number(ratings[data[key]].rating)}
                                            starRatedColor="#FAAD1C"
                                            numberOfStars={5}
                                            starDimension="30px"
                                            starSpacing="0px"
                                        />
                                        <br/>
                                        <br/>
                                        <br/>
                                        <p className="card-subtitle mb-2 text-muted">
                                            <i>" {ratings[data[key]].comment} "</i></p>
                                    </div>

                                    <div className="rating-card-right">
                                        <h6 className="card-title">Rated
                                            on: {new Date(ratings[data[key]].ratedOn).toLocaleString('default', {
                                                month: 'long',
                                                day: "numeric",
                                                year: "numeric"
                                            })}</h6>
                                        <Link
                                            to={{
                                                pathname: "/task",
                                                state: {
                                                    taskId: ratings[data[key]].task
                                                }
                                            }}
                                            style={{textDecoration: 'none'}}
                                        >
                                            <h6>Task</h6>
                                        </Link>

                                        <Link
                                            to={{
                                                pathname: "/profile",
                                                state: {
                                                    email: ratings[data[key]].influencer
                                                }
                                            }}
                                            style={{textDecoration: 'none'}}
                                        >
                                            <h6>Rated Influencer</h6>
                                        </Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="general-pagination">
                        <Pagination
                            itemsCount={data ? data.length : ""}
                            pageSize={this.state.pageSize}
                            onPageChange={this.handlePageChange}
                            currentPage={this.state.currentPage}
                        />
                    </div>

                </React.Fragment>
            );
        }
    }
}

SponsorRating.propTypes = {
    ratings: PropTypes.object.isRequired,
    getSponsorRatings: PropTypes.func.isRequired,
    sortRatingsHighToLow: PropTypes.func.isRequired,
    sortRatingsLowToHigh: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ratings: state.rating.ratings,
});

export default (
    connect(
        mapStateToProps,
        {
            getSponsorRatings, sortRatingsHighToLow, sortRatingsLowToHigh
        }
    )(SponsorRating)
);





