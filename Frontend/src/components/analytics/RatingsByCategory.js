import React from "react";
//import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
//import { Pie } from "react-chartjs-2";

import { MDBContainer } from "mdbreact";
import { getInfluencerRatingsByCategory } from "../../actions/analyticsActions";
import { connect } from "react-redux";
import { getEmailFromLocalStorage } from "../Common/auth";

class RatingsByCategory extends React.Component {
  state = {
    email: getEmailFromLocalStorage(),

    data: {
      labels: [
        // "Apparels", //pink
        // "Automobile", //purple
        // "Beauty and Personal Care", //orange
        // "Education", //mildgreen
        // "Electronics", //darkpurple
        // "Entertainment", //charcoalgrey
        // "Fitness & Gym", //skyblue
        // "Food", //leafgreen
        // "Health", //yellow
        // "Kids", //lightgreen
        // "Photography", //cyan
        // "Sports & Outdoors", //darkgreen
        // "Travel", // purple
        // "Video Games", //grey
      ],

      datasets: [
        {
          label: "Category",
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
          data: [
            // 0,
            // 0.5,
            // 1.0,
            // 1.5,
            // 2.0,
            // 2.5,
            // 3.0,
            // 3.5,
            // 4.0,
            // 4.5,
            // 5.0,
            // 2.3,
            // 4.5,
            // 3,
          ],
        },
      ],
    },
  };

  componentDidMount() {
    this.props.getInfluencerRatingsByCategory(this.state.email).then(() => {
      console.log(
        "Influencer Earnings by category:",
        this.props.influencer_ratingsbycategory
      );
      const obj = this.props.influencer_ratingsbycategory;
      const labels = Object.keys(obj);
      const data = Object.values(obj);
      var backgroundColor = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ];
      backgroundColor = backgroundColor.slice(0, data.length);

      var borderColor = [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ];
      borderColor = borderColor.slice(0, data.length);

      this.setState({
        data: {
          labels: labels,

          datasets: [
            {
              label: "Bar represents Category ",
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }

  render() {
    console.log(
      "Influencer Ratings by category:",
      this.props.influencer_ratingsbycategory
    );

    return (
      <MDBContainer>
        <Bar
          data={this.state.data}
          options={{
            title: {
              display: true,
              text: "Bar Represents Category",
              fontSize: 10,
            },
            responsive: true,
          }}
        />
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  influencer_ratingsbycategory: state.analytics.influencer_ratingsbycategory,
});

export default connect(mapStateToProps, {
  getInfluencerRatingsByCategory,
})(RatingsByCategory);
