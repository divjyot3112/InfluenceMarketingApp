import {React, Component} from "react";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {getInfluencerRatings} from "../../actions/ratingActions";


class InfluencerRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            pageSize: 5,
        };
    }

    componentDidMount() {
        // TODO: Get influencer email from local storage
        const email = "divjyot@gmail.com";

        this.props.getInfluencerRatings(email)
    }

    render() {

        // TODO: if user is not logged in, redirect to home

        const {influencerRatings} = this.props;
        console.log(influencerRatings)
        const data = Object.keys(influencerRatings)


        if (Object.keys(influencerRatings).length === 0) {
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
                    hello


                    {data.map(key => (
                        <div>
                            {influencerRatings[data[key]].comment}
                            <br/>
                            {influencerRatings[data[key]].sponsor}
                        </div>
                    ))}
                </React.Fragment>
            );
        }
    }

}


InfluencerRating.propTypes = {
    influencerRatings: PropTypes.object.isRequired,
};

// InfluencerRating = reduxForm({
//     form: "postTaskForm",
// })(InfluencerRating);

InfluencerRating = connect(
    (state) => ({
        influencerRatings: state.rating.influencerRatings,
    }),
    {getInfluencerRatings}
)(InfluencerRating);

export default InfluencerRating;