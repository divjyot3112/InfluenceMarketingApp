import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { getSponsorPaymentbyCategory } from "../../actions/analyticsActions";
import { connect } from "react-redux";

class PaymentByCategory extends React.Component {
  state = {
    email: "testsponsor@gmail.com",
    dataBar: {
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
      ], //symptoms
      datasets: [
        {
          label: "Categories",
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
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",
            "rgba(255, 177, 101,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
            "rgb(201, 203, 207)",
          ],
        },
      ],
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  componentDidMount() {
    this.props.getSponsorPaymentbyCategory(this.state.email);
  }

  render() {
    console.log("Payment by category:", this.props.sponsor_paymentbycategory);
    return (
      <MDBContainer style={{ height: "100%", width: "100%" }}>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  sponsor_paymentbycategory: state.analytics.sponsor_paymentbycategory,
});

export default connect(mapStateToProps, {
  getSponsorPaymentbyCategory,
})(PaymentByCategory);
