import React, { Component } from "react";
import axios from "axios";
import "../../css/sponsorHome.css";
import WOW from "wow.js";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import {
  getSponsorInProgressTasks,
  getSponsorPendingTasks,
} from "../../actions/homeActions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { TaskStatus } from "../../utils/Constants";

import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardBody,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";

class InfluencerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "sheena@gmail.com",
    };
  }
  componentDidMount() {
    const wow = new WOW();

    wow.init();

    this.props.getSponsorPendingTasks(this.state.email, TaskStatus.PENDING);
    this.props.getSponsorInProgressTasks(
      this.state.email,
      TaskStatus.INPROGRESS
    );
  }

  render() {
    console.log("All pending tasks", this.props.pendingtasks);
    console.log("All inprogress tasks", this.props.inprogresstasks);

    return (
      <div class="border">
        {/* RECENTLY POSTED DIV*/}
        <div
          class="container-lg ml-8 mt-5 border rounded"
          style={{ padding: "2%" }}
        >
          <div>
            <br /> <h2> RECENTLY POSTED </h2>{" "}
          </div>

          <div class="row ">
            <div class="col-lg-6 col-md-6 col-sm-6 text-right">
              <button type="button" class="btn btn-outline-primary">
                <i class="fas fa-arrow-left"></i>
              </button>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 text-left">
              <button type="button" class="btn btn-outline-primary text-center">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <br />
          <div class="card-deck">
            <div class="card">
              <img
                class="card-img-top"
                src="https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/68926/910/607/m1/fpnw/wm0/tshirt-realistic-screenshot-01-.jpg?1390946656&s=d73aff283d355c41eb17ea98070fce4f"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">HRX's Summer Collection is Out</h5>
                <p class="card-text">
                  We are looking for fashion bloggers who can help us share our
                  new fabulous summer collection for both men and women.{" "}
                </p>{" "}
                <p class="card-text">
                  Your job will be to daily share the pictures of our models on
                  your instagram account.
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://www.thegreatcoursesplus.com/media/catalog/product/7/7/7776.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">EasyGuitar Online course</h5>
                <p class="card-text">
                  Picking up the guitar for first time? Doesn't matter! Improve
                  any Skill on Guitar in 30 Days Guaranteed! Try it Risk-Free
                  Now.
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://vader-prod.s3.amazonaws.com/1576175525-ffbeacon2mgrid-1565399625.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">NexxxT Running Shoes </h5>
                <p class="card-text">
                  Evolved with a dynamic rubber outsole, this run-inspired kick
                  is back for another round of history. This item is only
                  Limited Edition!
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            {" "}
            <div class="col-md-10 col-sm-10 col-lg-10"></div>
            <div class="col-md-2 col-sm-2 col-lg-2">
              <h5> See More </h5>{" "}
            </div>
          </div>
        </div>
        <div>
          {" "}
          <br /> <br /> <hr />{" "}
        </div>
        {/* MY ACTIVE DIV*/}
        <div
          class="container-lg ml-8 mt-5 border rounded"
          style={{ padding: "2%" }}
        >
          <div>
            <br /> <h2> MY ACTIVE TASKS </h2>{" "}
          </div>

          <div class="row ">
            <div class="col-lg-6 col-md-6 col-sm-6 text-right">
              <button type="button" class="btn btn-outline-primary">
                <i class="fas fa-arrow-left"></i>
              </button>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 text-left">
              <button type="button" class="btn btn-outline-primary text-center">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <br />
          <div class="card-deck">
            <div class="card">
              <img
                class="card-img-top"
                src="https://www.somagnews.com/wp-content/uploads/2020/01/b8-1-e1577995435435-696x382.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Grand Theft Auto 6</h5>
                <p class="card-text">
                  Grand Theft Auto 6 is available in market now! This is one of
                  the most awaited version of our game.
                </p>
                <p class="card-text">
                  The candidates job will be to play the game daily and share
                  some of their screen recordings on their Instagram account. We
                  need a minimum of 5 videos and 7 pictures to be shared daily.
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://cdn3.dpmag.com/2017/09/002a-beautyshot.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">H1 Camera Kit</h5>
                <p class="card-text">
                  The innovative H1 lets you switch from manual or autofocus,
                  and accepts digital backs, like the Leaf Valeo 22, letting you
                  switch between digital and analog recordings.
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://firebasestorage.googleapis.com/v0/b/masterfinalproject-4583d.appspot.com/o/tasks%2Fhrichardson%40shaffer.com_up-energy-drink.jpg?alt=media&token=16d2aff6-a8b7-4c9e-8d5b-ed758fdbc5b1"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Up Energy Drink</h5>
                <p class="card-text">
                  Instagram fitness influencer with minimum 1000 followers
                  needed to promote Christian Guzman's new Up Energy Drink. The
                  ad must be a video and needs to be atleast 30 seconds.
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            {" "}
            <div class="col-md-10 col-sm-10 col-lg-10"></div>
            <div class="col-md-2 col-sm-2 col-lg-2">
              <h5> See More </h5>{" "}
            </div>
          </div>
        </div>
        <div>
          {" "}
          <br /> <br /> <hr />{" "}
        </div>
        <div
          class="container-lg ml-8 mt-5 border rounded"
          style={{ padding: "2%" }}
        >
          <div>
            <br /> <h2> RECOMMENDED FOR YOU </h2>{" "}
          </div>

          <div class="row ">
            <div class="col-lg-6 col-md-6 col-sm-6 text-right">
              <button type="button" class="btn btn-outline-primary">
                <i class="fas fa-arrow-left"></i>
              </button>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 text-left">
              <button type="button" class="btn btn-outline-primary text-center">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <br />
          <div class="card-deck">
            <div class="card">
              <img
                class="card-img-top"
                src="https://www.osprey.com/images/product/hero/daylite_f18_sideback_stonegrey_f17.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Hiking Bag</h5>
                <p class="card-text">
                  Easy to carry and easy to store, this essential, go-anywhere
                  daypack folds into the smaller front zip pocket for stowing.
                  Whether on the trail for weekend day hikes or on the road for
                  spontaneous shopping trips.
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://cdn.shopify.com/s/files/1/0049/4272/products/dumbbell-set-pairs-800_924307b6-11d1-4f7e-8850-27a917323a2f.jpg?v=1579198114"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">
                  Simply Lift 20 lbs, 30 lbs, 40 lbs Dumbbells
                </h5>
                <p class="card-text">
                  Tone muscle and build strength with a professional-grade
                  dumbbells that bring the weight room to your home.
                  TheSimplyLift 10 Dumbbell Set is perfect for strengthening
                  your arms, legs, abs, and more,
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
            <div class="card">
              <img
                class="card-img-top"
                src="https://blog-assets.thedyrt.com/uploads/2019/11/gear-1.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">Camping Gear</h5>
                <p class="card-text">
                  Columbia has recently launched a fresh range of camping gears
                  for kids, teenagers and adults. We are looking for people who
                  can help us promote our products.
                </p>{" "}
                <p class="card-text">
                  You need to have a strong fan base and must be able to share
                  our brand's content on your instagram handles.
                </p>
              </div>
              <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            {" "}
            <div class="col-md-10 col-sm-10 col-lg-10"></div>
            <div class="col-md-2 col-sm-2 col-lg-2">
              <h5> See More </h5>{" "}
            </div>
          </div>
        </div>
        <div>
          {" "}
          <br /> <br /> <hr />{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pendingtasks: state.home.pendingtasks,

  inprogresstasks: state.home.inprogresstasks,
});

//function mapDispatchToProps

export default connect(mapStateToProps, {
  getSponsorPendingTasks,
  getSponsorInProgressTasks,
})(InfluencerHome);
