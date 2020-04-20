import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getInfluencerRatings, sortRatingsLowToHigh, sortRatingsHighToLow} from "../../actions/ratingActions";
import "../../css/influencerRating.css";
import {Link} from "react-router-dom";
import Pagination from "../Common/pagination";
import {paginate} from "../Common/paginate";
import StarRatings from 'react-star-ratings';


class InfluencerRating extends Component {
    state = {
        currentPage: 1,
        pageSize: 5,
    };


    componentDidMount() {
        // TODO: Get influencer email from local storage
        const email = "divjyot@gmail.com";
        this.props.getInfluencerRatings(email)
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

        const {ratings, averageRating} = this.props;
        const data = Object.keys(ratings)

        const paginatedData = paginate(
            data ? data : "",
            this.state.currentPage,
            this.state.pageSize
        );

        if (Object.keys(ratings).length === 0) {
            return (
                <React.Fragment>
                    <p className="not-found">
                        No Ratings found
                    </p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>

                    <div className="main">

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

                        <div className="ratings-cards-main">
                            <hr/>
                            <div className="average-rating">
                                <h1>Average Rating: {averageRating}</h1>
                                <StarRatings
                                    rating={Number(averageRating)}
                                    starRatedColor="black"
                                    numberOfStars={5}
                                />
                            </div>
                            {paginatedData.map(key => (

                                <div className="rating-card" key={key}>
                                    <div className="rating-card-left">
                                        <h4 className="card-title">Rating: {ratings[data[key]].rating}</h4>
                                        <StarRatings
                                            rating={Number(ratings[data[key]].rating)}
                                            starRatedColor="black"
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
                                        {/*TODO: connect it with task description page */}
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
                                                    email: ratings[data[key]].sponsor
                                                }
                                            }}
                                            style={{textDecoration: 'none'}}
                                        >
                                            <h6>Sponsor who Rated</h6>
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

InfluencerRating.propTypes = {
    averageRating: PropTypes.object.isRequired,
    getInfluencerRatings: PropTypes.func.isRequired,
    sortRatingsHighToLow: PropTypes.func.isRequired,
    sortRatingsLowToHigh: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ratings: state.rating.ratings,
    averageRating: state.rating.averageRating
});

export default (
    connect(
        mapStateToProps,
        {
            getInfluencerRatings, sortRatingsHighToLow, sortRatingsLowToHigh
        }
    )(InfluencerRating)
);





