import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class RatingsByCategory extends React.Component {
  state = {
    data: {
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
          label: "Ratings vs Categories",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [2.1, 4.5, 4.5, 3, 5, 3.5, 1.4, 2.1, 4.5, 3, 0, 0, 0, 5],
        },
      ],
    },
  };

  render() {
    return (
      <MDBContainer style={{ height: "100%", width: "100%" }}>
        <Line data={this.state.data} />
      </MDBContainer>
    );
  }
}

export default RatingsByCategory;