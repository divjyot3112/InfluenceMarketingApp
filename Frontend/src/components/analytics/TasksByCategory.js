import React from "react";
import { Pie } from "react-chartjs-2";

import { MDBContainer } from "mdbreact";

import { getSponsorAllTasksbyCategory } from "../../actions/analyticsActions";
import { connect } from "react-redux";
import { getEmailFromLocalStorage } from "../Common/auth";

class TasksByCategory extends React.Component {
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
          data: [
            // 300, 50, 100, 500, 150, 200, 130, 120, 60, 24, 0, 0, 0, 15
          ],
          backgroundColor: [
            "#F5A9A9",
            "#E3CEF6",
            "#FF8000",
            "#088A68",
            "#0A0A2A",
            "#424242",
            "#81BEF7",
            "#4B610B",
            "#F3F781",
            "#82FA58",
            "#01DFD7",
            "#0B4C5F",
            "#D0A9F5",
            "#2E2E2E",
          ],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
  };

  componentDidMount() {
    this.props.getSponsorAllTasksbyCategory(this.state.email).then(() => {
      console.log(
        "Component did Mount" + this.props.sponsor_allTasksbycategory
      );
      const obj = this.props.sponsor_allTasksbycategory;
      const labels = Object.keys(obj);
      const data = Object.values(obj);
      var backgroundColor = [
        "#F5A9A9",
        "#E3CEF6",
        "#FF8000",
        "#088A68",
        "#0A0A2A",
        "#424242",
        "#81BEF7",
        "#4B610B",
        "#F3F781",
        "#82FA58",
        "#01DFD7",
        "#0B4C5F",
        "#D0A9F5",
        "#2E2E2E",
      ];
      backgroundColor = backgroundColor.slice(0, data.length);
      const hoverBackgroundColor = ["#FF6384", "#36A2EB", "#FFCE56"];
      this.setState({
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColor,
              hoverBackgroundColor: hoverBackgroundColor,
            },
          ],
        },
      });
    });
  }

  render() {
    console.log(
      "All tasks by category: ",
      this.props.sponsor_allTasksbycategory
    );
    return (
      <MDBContainer style={{ height: "100%", width: "100%" }}>
        <Pie data={this.state.data} />
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  sponsor_allTasksbycategory: state.analytics.sponsor_allTasksbycategory,
});

export default connect(mapStateToProps, {
  getSponsorAllTasksbyCategory,
})(TasksByCategory);
