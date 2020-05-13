import React from "react";
import "../../css/LandingPage.css";
import WOW from "wow.js";
import smallcard from "./Images/social15.jpg";
import { NoImageFound } from "../../utils/Constants";
import Footer from "../Common/Footer";
import { connect } from "react-redux";
import { LoginUser, RegisterUser } from "../../actions/userActions";
import jwt_decode from "jwt-decode";
import LandingPageFormEventHandlers from "./LandingPageFormEventHandlers";
import { If } from "react-if";
import Joi from "joi-browser";
import {
  getEmailFromLocalStorage,
  getRoleFromLocalStorage,
} from "../Common/auth";
import { Redirect } from "react-router";

const userRoles = require("../../utils/Constants").UserRoles;

class Landing extends LandingPageFormEventHandlers {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: "",
      loginPassword: "",
      email: "",
      password: "",
      phone: "",
      role: userRoles.INFLUENCER,
      firstName: "",
      lastName: "",
      followersCount: "",
      company: "",
      errors: {},
    };

    this.handleLoginEmail = this.handleLoginEmail.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    this.handleFollowersCount = this.handleFollowersCount.bind(this);
  }

  schema = {
    firstName: Joi.string()
      .max(20)
      .required()
      .regex(/^[a-zA-Z\s]*$/)
      .label("First Name"),
    lastName: Joi.string()
      .max(20)
      .required()
      .regex(/^[a-zA-Z\s]*$/)
      .label("Last Name"),
    company: Joi.string().max(20).required().label("Company"),
    password: Joi.string().max(20).required().label("Password"),
  };

  handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
    };
    this.props.LoginUser(data).then(() => {
      const response = this.props.loginResponse;

      if (response && response.message === null) {
        window.alert("Email does not exist. Please register to continue.");
      } else if (response && response.message === "Password is incorrect") {
        window.alert("Your password is invalid.");
      } else if (response && response.token !== "Bearer undefined") {
        const decodedToken = jwt_decode(response.token);
        window.localStorage.setItem("role", decodedToken.user.role);
        window.localStorage.setItem("email", decodedToken.user.email);
        this.props.history.push({
          pathname: "/home",
          state: { loggedIn: true },
        });
      }
    });
  };

  handleSignUp = (e) => {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      role: this.state.role,
      name: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      },
      image: NoImageFound,
      company: this.state.company,
      followersCount: this.state.followersCount,
    };

    this.props.RegisterUser(data).then(() => {
      const response = this.props.SignUpResponse;
      console.log(response.message);

      if (response && response.message === "User already exists") {
        window.alert("Email already exists. Please login to continue.");
      } else {
        window.alert("Signed up Successfully! Please login to continue.");
        window.location.reload();
      }
    });
  };

  checkSignUpDisable() {
    return (
      this.state.firstName == "" ||
      this.state.lastName == "" ||
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.phone == "" ||
      (this.state.followersCount == "" && this.state.company == "")
    );
  }

  checkLoginDisable() {
    return this.state.loginEmail == "" || this.state.loginPassword == "";
  }

  componentDidMount() {
    const wow = new WOW();
    wow.init();
  }

  render() {
    let redirectVar = null;
    if (getEmailFromLocalStorage()) {
      redirectVar = <Redirect to="/home" />;
    }

    return (
      <div>
        {redirectVar}
        <nav
          class="navbar fixed-top navbar-expand-lg navbar-light"
          style={{ backgroundColor: "aliceblue" }}
        >
          <div class="container">
            <a class="navbar-brand" href="/">
              <strong
                class="wow fadeInLeftBig app-name"
                data-wow-duration="10s"
              >
                TOGETHER
              </strong>
            </a>

            <div className="col-sm-3" style={{ "margin-left": "20%" }}>
              <div className="md-form">
                <i className="fas fa-envelope prefix grey-text"></i>
                <input
                  type="text"
                  id="loginEmail"
                  name="loginEmail"
                  value={this.state.loginEmail}
                  onChange={this.handleLoginEmail}
                  className="form-control"
                  placeholder="Email"
                />
                <span className="error"> {this.state.errors.loginEmail}</span>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="md-form">
                <i className="fas fa-key prefix grey-text"></i>
                <input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  value={this.state.loginPassword}
                  onChange={this.handleLoginPassword}
                  className="form-control"
                  placeholder="Password"
                />
                <span className="error">
                  {" "}
                  {this.state.errors.loginPassword}
                </span>
              </div>
            </div>

            <div className="col-sm-2">
              <div className="md-form">
                <button
                  className="btn btn-success "
                  onClick={this.handleLogin}
                  disabled={this.checkLoginDisable()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </nav>
        {/*navbar ends*/}
        <div class="masthead">
          <div class="mask rgba-black-light d-flex justify-content-center align-items-center">
            <div class="container">
              <div class="row wow fadeIn welcome">
                <div class="col-md-6 mb-4 white-text text-center text-md-left welcome-text">
                  <br />
                  <br />
                  <br />
                  <h1 class="display-4 font-weight-bold">
                    <p>
                      <strong>
                        Helping small Businesses grow and connect!
                      </strong>
                    </p>
                  </h1>

                  <hr class="hr-light" />

                  <p class="mb-4 d-none d-md-block">
                    <strong>
                      It’s tough for an average person to start to grow their
                      following on social media, connect to other influencers,
                      and get tasks from sponsors. Our application serves both
                      influencers and sponsors and makes their lives easier.
                      Users can search for influencers and start a conversation
                      with them. They can easily apply for tasks to earn money.
                    </strong>
                  </p>
                </div>

                <div class="col-md-6 col-xl-5 mb-4 signup-form">
                  <div class="card">
                    <div class="card-body">
                      <form name="">
                        <h3 class="dark-grey-text text-center">
                          <strong
                            class="wow fadeInDown"
                            data-wow-duration="5s "
                          >
                            Create a New Account
                          </strong>
                        </h3>
                        <h5
                          class="text-center wow fadeInDown"
                          data-wow-delay="2s"
                          data-wow-duration="10s "
                        >
                          {" "}
                          It’s quick and easy!{" "}
                        </h5>
                        <hr />

                        <div class="md-form">
                          <i class="fas fa-user prefix grey-text"></i>
                          <input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleFirstName}
                            id="firstName"
                            class="form-control"
                            placeholder="First Name*"
                          />
                          <span className="error">
                            {" "}
                            {this.state.errors.firstName}
                          </span>
                        </div>

                        <div class="md-form">
                          <i class="fas fa-user prefix grey-text"></i>
                          <input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleLastName}
                            id="lastName"
                            class="form-control"
                            placeholder="Last Name*"
                          />
                          <span className="error">
                            {" "}
                            {this.state.errors.lastName}
                          </span>
                        </div>

                        <div class="md-form">
                          <i class="fas fa-envelope prefix grey-text"></i>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleEmail}
                            class="form-control"
                            placeholder="Email*"
                          />
                          <span className="error">
                            {" "}
                            {this.state.errors.email}
                          </span>
                        </div>

                        <div class="md-form">
                          <i class="fas fa-key prefix grey-text"></i>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handlePassword}
                            class="form-control"
                            placeholder="Password*"
                          />
                          <span className="error">
                            {" "}
                            {this.state.errors.password}
                          </span>
                        </div>

                        <div class="md-form">
                          <i class="fas fa-phone prefix grey-text"></i>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handlePhone}
                            id="phone"
                            class="form-control"
                            placeholder="Contact Number*"
                          />
                          <span className="error">
                            {" "}
                            {this.state.errors.phone}
                          </span>
                        </div>

                        <If condition={this.state.role == userRoles.INFLUENCER}>
                          <div className="md-form">
                            <i className="fas fa-user-friends prefix grey-text"></i>
                            <input
                              type="text"
                              id="followersCount"
                              name="followersCount"
                              value={this.state.followersCount}
                              onChange={this.handleFollowersCount}
                              id="followersCount"
                              className="form-control"
                              placeholder="Number of Followers*"
                            />
                            <span className="error">
                              {" "}
                              {this.state.errors.followersCount}
                            </span>
                          </div>
                        </If>

                        <If condition={this.state.role == userRoles.SPONSOR}>
                          <div className="md-form">
                            <i className="fas fa-building prefix grey-text"></i>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={this.state.company}
                              onChange={this.handleCompany}
                              id="company"
                              className="form-control"
                              placeholder="Company*"
                            />
                            <span className="error">
                              {" "}
                              {this.state.errors.company}
                            </span>
                          </div>
                        </If>

                        <div
                          className="custom-control custom-switch"
                          style={{ "margin-left": "30%" }}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="role"
                            name="role"
                            value={this.state.role}
                            onChange={this.handleRole}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="role"
                          >
                            <b> I am a Sponsor </b>
                          </label>
                        </div>
                        <hr />
                        <div class="text-center">
                          <button
                            class="btn btn-success"
                            onClick={this.handleSignUp}
                            disabled={this.checkSignUpDisable()}
                          >
                            Create Account
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main>
          <div class="container ">
            <section class="mt-5 wow fadeIn">
              <div class="row">
                <div class="col-md-6 mb-4">
                  <img
                    src={smallcard}
                    class="img-fluid z-depth-1-half"
                    alt=""
                  />
                </div>

                <div class="col-md-6 mb-4">
                  <h3 class="h3 mb-3 wow bounceIn">
                    Our application is aimed at connecting social media
                    influencers with different small businesses or sponsors.
                  </h3>
                  <p>
                    People who are well-established in their career already have
                    a good number of fan-following. Our application targets the
                    people who are still in the process of increasing their
                    popularity through social media such as Twitter or
                    Instagram. We aim to help small-scale brands to be able to
                    find the influencers that they can afford.
                  </p>

                  <hr />
                </div>
              </div>
            </section>

            <hr class="my-5" />

            <section>
              <h3 class="h3 text-center mb-5">About Influence Marketing </h3>

              <div class="row wow fadeIn">
                <div class="col-lg-6 col-md-12 px-4">
                  <div class="row">
                    <div class="col-1 mr-3">
                      <i class="fas fa-code fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h5 class="feature-title">
                        What is Influence Marketing?
                      </h5>
                      <p class="grey-text">
                        Influence marketing is one form of advertising a
                        product. It involves an influencer, a sponsor and a
                        follower.
                      </p>
                    </div>
                  </div>

                  <br />

                  <div class="row">
                    <div class="col-1 mr-3">
                      <i class="fas fa-book fa-2x blue-text"></i>
                    </div>
                    <div class="col-10">
                      <h5 class="feature-title">What do we do?</h5>
                      <p class="grey-text">
                        Our application targets the people who are still in the
                        process of increasing their popularity through social
                        media such as Twitter or Instagram.
                      </p>
                    </div>
                  </div>

                  <br />

                  <div class="row">
                    <div class="col-1 mr-3">
                      <i class="fas fa-graduation-cap fa-2x cyan-text"></i>
                    </div>
                    <div class="col-10">
                      <h5 class="feature-title">How do we help?</h5>
                      <p class="grey-text">
                        We aim to help small-scale brands to be able to find
                        affordable influencers to market their products.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-12">
                  <p class="h5 text-center mb-4">
                    New to Influence Marketing?{" "}
                  </p>{" "}
                  <p>Watch our Quick tutorial</p>
                  <div class="embed-responsive embed-responsive-16by9">
                    {/* <iframe
                      class="embed-responsive-item"
                      src="https://www.youtube.com/watch?v=popowMuKyjY"
                      allowfullscreen
                    ></iframe> */}
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/sp9MHuzzN4E"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>

            <hr class="my-5" />

            <section>
              <h2 class="my-5 h3 text-center">Features</h2>

              <div class="row features-small mb-5 mt-3 wow fadeIn">
                <div class="col-md-4">
                  <h2>
                    {" "}
                    <strong> Influencer </strong>{" "}
                  </h2>
                  <br />
                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">Tasks based Analytics </h6>
                      <p class="grey-text">
                        Influencers can get detailed analytics on their average
                        ratings by category, total tasks completed by category
                        and their average earnings based on category.
                      </p>
                      <br />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">
                        Create and manage own profile
                      </h6>
                      <p class="grey-text">
                        Get your own profile page and advertise your interests
                        and level of marketing expertise. Get noticed by your
                        favorite sponsors.
                      </p>
                      <br />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">
                        Search all available tasks or other influencers
                      </h6>
                      <p class="grey-text">
                        Search from all the tasks recently posted. Complete
                        Tasks to earn money and earn followers! Search other
                        influencers like you and connect with them via our
                        instant messaging feature.
                      </p>

                      <br />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">Get Task Recommendations</h6>
                      <p class="grey-text">
                        See tasks which are more suitable to your likings and
                        profession!
                      </p>
                      <br />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">See ratings from Sponsors</h6>
                      <p class="grey-text">
                        See all the ratings given to you by sponsors and
                        increase your fan following!
                      </p>
                      <br />
                    </div>
                  </div>
                </div>

                <div class="col-md-4 flex-center">
                  <img
                    src="https://mdbootstrap.com/img/Others/screens.png"
                    alt="MDB Magazine Template displayed on iPhone"
                    class="z-depth-0 img-fluid"
                  />
                </div>

                <div class="col-md-4 mt-2">
                  <h2>
                    {" "}
                    <strong> Sponsor </strong>{" "}
                  </h2>
                  <br />
                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">Post a Task</h6>
                      <p class="grey-text">
                        Sponsors can create and post new tasks. Inluencers
                        around you can apply for the tasks. You can select the
                        ones you are confident about! They complete tasks which
                        is market your products!
                      </p>
                      <br />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">
                        Search and check out Influencer profiles in your area of
                        interest
                      </h6>
                      <p class="grey-text">
                        Have a look at influencers profile page, their
                        background and theirlevel of marketing expertise. See if
                        they match your brand interests.
                      </p>
                      <br />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">Task Based Analytics</h6>
                      <p class="grey-text">
                        Sponsors can use our application to get detailed
                        analytics on their average payments by category, total
                        tasks posted by category and their completed tasks by
                        category.
                      </p>
                      <br />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">
                        Dashboard for Tasks Management
                      </h6>
                      <p class="grey-text">
                        Sponsors get a dashboard for mananging all tasks in one
                        place. They can sort or filter them on basis of task
                        status such as Applied Tasks, Pending Tasks and
                        Completed Tasks or even view all posted tasks.
                      </p>
                      <br />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-2">
                      <i class="fas fa-check-circle fa-2x indigo-text"></i>
                    </div>
                    <div class="col-10">
                      <h6 class="feature-title">
                        Rate Influencers based on their performance
                      </h6>
                      <p class="grey-text">
                        See all the applicants that completed your tasks and
                        rate the influencers based on how they performed their
                        job!
                      </p>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr class="mb-5" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginResponse: state.user.loginResponse,
  SignUpResponse: state.user.SignUpResponse,
});

export default connect(mapStateToProps, { LoginUser, RegisterUser })(Landing);
