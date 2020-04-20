import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSponsorRatings} from "../../actions/ratingActions";
import "../../css/sponsorRating.css";
import {Link} from "react-router-dom";


class SponsorRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            pageSize: 5,
        };
    }

    componentDidMount() {
        // TODO: Get sponsor email from local storage
        const email = "sheena@gmail.com";

        this.props.getSponsorRatings(email)
    }

    render() {

        // TODO: if user is not logged in, redirect to home

        const {sponsorRatings} = this.props;
        const data = Object.keys(sponsorRatings)


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
                            <div className="form-group">
                                <b>
                                    Sort By:
                                </b>
                                <select
                                    className="form-control"
                                    name="sorting"
                                    id="sorting"
                                    // onChange={this.handleCategory}
                                >
                                    <option value="recent" selected>Most Recent</option>
                                    <option value="lowToHigh">Rating: Low to High</option>
                                    <option value="highToLow">Rating: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="ratings-cards-main">
                            <hr/>
                            {data.map(key => (
                                <div className="rating-card">
                                    <div className="rating-card-left">
                                        <h4 className="card-title">Rating: {sponsorRatings[data[key]].rating}</h4>
                                        <p className="card-subtitle mb-2 text-muted">
                                            <i>" {sponsorRatings[data[key]].comment} "</i></p>
                                    </div>

                                    <div className="rating-card-right">
                                        <h6 className="card-title">Rated on: {sponsorRatings[data[key]].ratedOn}</h6>
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


                </React.Fragment>
            );
        }
    }
}

SponsorRating.propTypes = {
    sponsorRatings: PropTypes.object.isRequired
};

SponsorRating = connect(
    (state) => ({
        sponsorRatings: state.rating.sponsorRatings,
    }),
    {getSponsorRatings}
)(SponsorRating);

export default SponsorRating;




