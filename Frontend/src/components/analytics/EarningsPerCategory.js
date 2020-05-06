import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class EarningsPerCategory extends React.Component {
  state = {
    dataHorizontal: {
      labels: [
        "Apparels",
        "Automobile",
        "Beauty and Personal Care",
        "Education",
        "Electronics",
        "Entertainment",
        "Fitness & Gym",
        "Food",
        "Health",
        "Kids",
        "Photography",
        "Sports & Outdoors",
        "Travel",
        "Video Games",
      ],
      datasets: [
        {
          label: "Categories ",
          data: [
            2213,
            1133,
            4325,
            2212,
            8186,
            1123,
            1114,
            1213,
            4133,
            1215,
            232,
            1186,
            1123,
            6114,
          ],
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
        },
      ],
    },
  };

  render() {
    return (
      <MDBContainer style={{ height: "100%", width: "100%" }}>
        <HorizontalBar
          data={this.state.dataHorizontal}
          options={{ responsive: true }}
        />
      </MDBContainer>
    );
  }
}

export default EarningsPerCategory;