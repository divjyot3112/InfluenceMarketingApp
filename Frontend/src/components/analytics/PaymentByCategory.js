import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { getSponsorPaymentbyCategory } from "../../actions/analyticsActions";
import { connect } from "react-redux";
import { getEmailFromLocalStorage } from "../Common/auth";

class PaymentByCategory extends React.Component {
  state = {
    email: getEmailFromLocalStorage(),

    data: {
      labels: [],

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
          data: [],
        },
      ],
    },
  };

  componentDidMount() {
    this.props.getSponsorPaymentbyCategory(this.state.email).then(() => {
      console.log(
        "Influencer Earnings by category:",
        this.props.sponsor_paymentbycategory
      );
      const obj = this.props.sponsor_paymentbycategory;
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
    console.log("Payment by category:", this.props.sponsor_paymentbycategory);
    return (
      <MDBContainer>
        <Bar
          data={this.state.data}
          options={{
            title: {
              display: true,
              text: "Values to left are earnings in dollars",
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
  sponsor_paymentbycategory: state.analytics.sponsor_paymentbycategory,
});

export default connect(mapStateToProps, {
  getSponsorPaymentbyCategory,
})(PaymentByCategory);
