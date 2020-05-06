import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class TaskCountbyCategory extends React.Component {
  state = {
    data: {
      labels: [
        "Apparels", //pink
        "Automobile", //purple
        "Beauty and Personal Care", //orange
        "Education", //mildgreen
        "Electronics", //darkpurple
        "Entertainment", //charcoalgrey
        "Fitness & Gym", //skyblue
        "Food", //leafgreen
        "Health", //yellow
        "Kids", //lightgreen
        "Photography", //cyan
        "Sports & Outdoors", //darkgreen
        "Travel", // purple
        "Video Games", //grey
      ],
      datasets: [
        {
          data: [300, 50, 100, 500, 150, 200, 130, 120, 60, 24, 0, 0, 0, 15],
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

  render() {
    return (
      <MDBContainer style={{ height: "100%", width: "100%" }}>
        <Doughnut data={this.state.data} />
      </MDBContainer>
    );
  }
}

export default TaskCountbyCategory;
