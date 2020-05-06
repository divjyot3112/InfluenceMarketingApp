import React from "react";
import { Bubble } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class TasksByCategory extends React.Component {
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
          label: "Tasks By Category",
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
          data: [
            { x: "Apparels", y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
            { x: 10, y: 20, r: 5 },
          ],
        },
      ],
    },
  };

  render() {
    return (
      <MDBContainer style={{ height: "100%", width: "100%" }}>
        <Bubble data={this.state.data} />
      </MDBContainer>
    );
  }
}

export default TasksByCategory;
