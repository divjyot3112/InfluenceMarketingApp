import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSponsorRatings, sortRatingsLowToHigh, sortRatingsHighToLow} from "../../actions/ratingActions";
import "../../css/sponsorRating.css";
import {Link} from "react-router-dom";
import Pagination from "../Common/pagination";
import {paginate} from "../Common/paginate";


class SponsorRating extends Component {
    state = {
        currentPage: 1,
        pageSize: 5,
    };


    componentDidMount() {
        // TODO: Get sponsor email from local storage
        const email = "sheena@gmail.com";

        this.props.getSponsorRatings(email)
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleRatingSorting = (e) => {
        if (e.target.value === "lowToHigh") {
            this.props.sortRatingsLowToHigh(this.props.sponsorRatings);
        } else if (e.target.value === "highToLow") {
            this.props.sortRatingsHighToLow(this.props.sponsorRatings);
        } else if (e.target.value === "mostRecent") {
            window.location.reload();
        }
        this.forceUpdate();
    };

    render() {
        // TODO: if user is not logged in, redirect to home

        const {sponsorRatings} = this.props;
        const data = Object.keys(sponsorRatings)

        console.log(sponsorRatings)

        const paginatedData = paginate(
            data ? data : "",
            this.state.currentPage,
            this.state.pageSize
        );

        if (Object.keys(sponsorRatings).length === 0) {
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
                                <option value="" selected disabled>Sort by</option>
                                <option value="mostRecent">Most Recent</option>
                                <option value="lowToHigh">Rating: Low to High</option>
                                <option value="highToLow">Rating: High to Low</option>
                            </select>
                        </div>

                        <div className="ratings-cards-main">
                            <hr/>
                            {paginatedData.map(key => (

                                <div className="rating-card">
                                    <div className="rating-card-left">
                                        <h4 className="card-title">Rating: {sponsorRatings[data[key]].rating}</h4>
                                        <p className="card-subtitle mb-2 text-muted">
                                            <i>" {sponsorRatings[data[key]].comment} "</i></p>
                                    </div>

                                    <div className="rating-card-right">
                                        <h6 className="card-title">Rated
                                            on: {new Date(sponsorRatings[data[key]].ratedOn).toLocaleString('default', {
                                                month: 'long',
                                                day: "numeric",
                                                year: "numeric"
                                            })}</h6>
                                        {/*TODO: connect it with task description page */}
                                        <Link
                                            to={{
                                                pathname: "/task",
                                                state: {
                                                    taskId: sponsorRatings[data[key]].task
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
                                                    email: sponsorRatings[data[key]].influencer
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
    sponsorRatings: PropTypes.object.isRequired,
    getSponsorRatings: PropTypes.func.isRequired,
    sortRatingsHighToLow: PropTypes.func.isRequired,
    sortRatingsLowToHigh: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    sponsorRatings: state.rating.sponsorRatings,
});

export default (
    connect(
        mapStateToProps,
        {
            getSponsorRatings, sortRatingsHighToLow, sortRatingsLowToHigh
        }
    )(SponsorRating)
);





