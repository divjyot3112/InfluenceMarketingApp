import React from "react";
import "../../css/LandingPage.css";
import WOW from "wow.js";
import smallcard from "./Images/social15.jpg";
import {NoImageFound} from "../../utils/Constants";
import Footer from "../Common/Footer";
import {connect} from "react-redux";
import {LoginUser, RegisterUser} from "../../actions/userActions";
import jwt_decode from "jwt-decode";
import LandingPageFormEventHandlers from "./LandingPageFormEventHandlers";
import {If} from "react-if";
import Joi from "joi-browser";
import TextField from "@material-ui/core/TextField/TextField";

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

        this.handleloginEmail = this.handleloginEmail.bind(this);
        this.handleloginPassword = this.handleloginPassword.bind(this);
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
                window.alert("Email does not exist. Please register to continue.")
            } else if (response && response.message === "Password is incorrect") {
                window.alert("Your password is invalid.");
            } else if (response && response.token !== "Bearer undefined") {
                const decodedToken = jwt_decode(response.token);
                window.localStorage.setItem("role", decodedToken.user.role);
                window.localStorage.setItem("email", decodedToken.user.email);
                this.props.history.push("/home");
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
            followersCount: this.state.followersCount
        };

        this.props.RegisterUser(data).then(() => {
            const response = this.props.SignUpResponse;
            console.log(response.message)

            if (response && response.message === "User already exists") {
                window.alert("Email already exists. Please login to continue.")
            } else {
                window.alert("Signed up Successfully! Please login to continue.");
                window.location.reload();
            }
        });
    };

    checkDisable() {
        return this.state.firstName == "" ||
            this.state.lastName == "" ||
            this.state.email == "" ||
            this.state.password == "" ||
            this.state.phone == "" ||
            (this.state.followersCount == "" &&
                this.state.company == "");
    }

    componentDidMount() {
        const wow = new WOW();
        wow.init();
    }

    render() {
        return (
            <div>
                <nav
                    class="navbar fixed-top navbar-expand-lg navbar-light"
                    style={{backgroundColor: "aliceblue"}}
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

                        <div className="col-sm-3" style={{"margin-left": "20%"}}>
                            <div className="md-form">
                                <i className="fas fa-envelope prefix grey-text"></i>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={this.state.loginEmail}
                                    onChange={this.handleloginEmail}
                                    className="form-control"
                                    placeholder="Email"
                                />
                                {/* <label for="form2"> Email</label> */}
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="md-form">
                                <i className="fas fa-key prefix grey-text"></i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={this.state.loginPassword}
                                    onChange={this.handleloginPassword}
                                    className="form-control"
                                    placeholder="Password"
                                />
                                {/* <label for="form2"> Password</label> */}
                            </div>
                        </div>

                        <div className="col-sm-2">
                            <div className="md-form">
                                <button
                                    className="btn btn-success "
                                    onClick={this.handleLogin}
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
                                    <br/>
                                    <br/>
                                    <br/>
                                    <h1 class="display-4 font-weight-bold">
                                        <p>
                                            <strong>
                                                Helping small Businesses grow and connect!
                                            </strong>
                                        </p>
                                    </h1>

                                    <hr class="hr-light"/>

                                    <p class="mb-4 d-none d-md-block">
                                        <strong>
                                            Our application is mainly for social media influencers,
                                            which allows them to connect to different sponsors. People
                                            who are well-established in their career already have a
                                            good number of fan-following. Our application targets the
                                            people who are still in the process of increasing their
                                            popularity through social media. We help the smallscale
                                            brands to find the right influencers that they can afford.
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
                                                <hr/>

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
                                                    <span className="error"> {this.state.errors.firstName}</span>
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
                                                    <span className="error"> {this.state.errors.lastName}</span>
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
                                                    <span className="error"> {this.state.errors.email}</span>
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
                                                    <span className="error"> {this.state.errors.password}</span>
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
                                                    <span className="error"> {this.state.errors.phone}</span>
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
                                                        <span
                                                            className="error"> {this.state.errors.followersCount}</span>
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
                                                        <span className="error"> {this.state.errors.company}</span>
                                                    </div>
                                                </If>

                                                <div
                                                    className="custom-control custom-switch"
                                                    style={{"margin-left": "30%"}}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="role"
                                                        name="role"
                                                        value={this.state.role}
                                                        onChange={this.handleRole}
                                                    />
                                                    <label className="custom-control-label" htmlFor="role">
                                                        <b> I am a Sponsor </b>
                                                    </label>
                                                </div>
                                                <hr/>
                                                <div class="text-center">
                                                    <button
                                                        class="btn btn-success"
                                                        onClick={this.handleSignUp}
                                                        disabled={this.checkDisable()}
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

                                    <hr/>
                                </div>
                            </div>
                        </section>

                        <hr class="my-5"/>

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
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Consequatur expedita dignissimos ad eum iusto! Dolores
                                                facilis neque incidunt dolorum sit nobis, officia
                                                laboriosam consequuntur vero quasi dicta eum dolorem
                                                possimus.
                                            </p>
                                        </div>
                                    </div>

                                    <br/>

                                    <div class="row">
                                        <div class="col-1 mr-3">
                                            <i class="fas fa-book fa-2x blue-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h5 class="feature-title">How it works?</h5>
                                            <p class="grey-text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Quasi voluptas ex maiores hic repellat enim quaerat
                                                laboriosam harum facere perferendis aliquam temporibus
                                                id inventore, modi commodi, expedita placeat asperiores
                                                tempora.
                                            </p>
                                        </div>
                                    </div>

                                    <br/>

                                    <div class="row">
                                        <div class="col-1 mr-3">
                                            <i class="fas fa-graduation-cap fa-2x cyan-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h5 class="feature-title">
                                                Can anyone become an Influencer?
                                            </h5>
                                            <p class="grey-text">
                                                Lorem ipsum, dolor sit amet consectetur adipisicing
                                                elit. Rerum laborum optio non repellendus officiis nemo
                                                expedita inventore? Esse suscipit iure praesentium, at
                                                ipsum odit necessitatibus aliquid, quibusdam eius sit
                                                atque.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-12">
                                    <p class="h5 text-center mb-4">
                                        New to Influence Marketing?{" "}
                                    </p>{" "}
                                    <p>Watch our "5 min Quick Start" tutorial</p>
                                    <div class="embed-responsive embed-responsive-16by9">
                                        {/* <iframe
                      class="embed-responsive-item"
                      src="https://www.youtube.com/watch?v=popowMuKyjY"
                      allowfullscreen
                    ></iframe> */}

                                        <iframe
                                            width="1440"
                                            height="540"
                                            src="https://www.youtube.com/embed/popowMuKyjY"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr class="my-5"/>

                        <section>
                            <h2 class="my-5 h3 text-center">Features</h2>

                            <div class="row features-small mb-5 mt-3 wow fadeIn">
                                <div class="col-md-4">
                                    <h2>
                                        {" "}
                                        <strong> Influencer </strong>{" "}
                                    </h2>
                                    <br/>
                                    <div class="row">
                                        <div class="col-2">
                                            <i class="fas fa-check-circle fa-2x indigo-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h6 class="feature-title">Dashboard for Task History</h6>
                                            <p class="grey-text">
                                                We offer a full fledged dashboard which contains history
                                                of tasks
                                            </p>
                                            <br/>
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
                                            <br/>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-2">
                                            <i class="fas fa-check-circle fa-2x indigo-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h6 class="feature-title">
                                                Search available tasks posted in real time
                                            </h6>
                                            <p class="grey-text">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit. Porro provident quia consequatur id ex itaque
                                                totam explicabo unde quibusdam nemo, alias repellat
                                                nulla in expedita dolores quaerat magni earum debitis?
                                            </p>
                                            <br/>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-2">
                                            <i class="fas fa-check-circle fa-2x indigo-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h6 class="feature-title">Get Task Recommendations</h6>
                                            <p class="grey-text">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. Fuga sint accusamus pariatur laudantium,
                                                voluptates sapiente dolor temporibus, consequuntur
                                                numquam sit exercitationem perferendis reprehenderit
                                                consequatur nesciunt. Et molestiae alias similique iste.
                                            </p>
                                            <br/>
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
                                    <br/>
                                    <div class="row">
                                        <div class="col-2">
                                            <i class="fas fa-check-circle fa-2x indigo-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h6 class="feature-title">Post a Task</h6>
                                            <p class="grey-text">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit. Perspiciatis nemo numquam velit. Harum ex labore
                                                deleniti fuga sed sunt aspernatur expedita eum facilis
                                                inventore ea, reiciendis, voluptatum laboriosam debitis
                                                dolores!
                                            </p>
                                            <br/>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-2">
                                            <i class="fas fa-check-circle fa-2x indigo-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h6 class="feature-title">
                                                Dashboard for all tasks offered
                                            </h6>
                                            <p class="grey-text">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. Sed dolorem consectetur est nobis. Debitis nostrum
                                                suscipit laudantium consequatur fugiat? Tempore placeat
                                                ut beatae earum maxime nesciunt quibusdam soluta ratione
                                                obcaecati?
                                            </p>
                                            <br/>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-2">
                                            <i class="fas fa-check-circle fa-2x indigo-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h6 class="feature-title">Task Analysis</h6>
                                            <p class="grey-text">
                                                Get a detailed analysis summary of all the tasks in
                                                progress and if the tasks are being completed
                                                appropriately.
                                            </p>
                                            <br/>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-2">
                                            <i class="fas fa-check-circle fa-2x indigo-text"></i>
                                        </div>
                                        <div class="col-10">
                                            <h6 class="feature-title">List of Applied Applicants</h6>
                                            <p class="grey-text">
                                                See all the applicants that have applied to the task and
                                                select the most qualified person for the job.
                                            </p>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <hr class="mb-5"/>

                        <section>
                            <h2 class="my-5 h3 text-center">SEE MORE</h2>

                            <div class="row features-small mt-5 wow fadeIn">
                                <div class="col-xl-3 col-lg-6">
                                    <div class="row">
                                        <div class="col-2">
                                            <i
                                                class="fab fa-firefox fa-2x mb-1 indigo-text"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div class="col-10 mb-2 pl-3">
                                            <h5 class="feature-title font-bold mb-1">ABCD</h5>
                                            <p class="grey-text mt-2">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Voluptate ullam corrupti labore itaque, repellat, harum
                                                in ipsam recusandae impedit numquam ratione repudiandae
                                                quidem accusantium nostrum temporibus? Eos ducimus iusto
                                                minus.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-6">
                                    <div class="row">
                                        <div class="col-2">
                                            <i
                                                class="fas fa-level-up-alt fa-2x mb-1 indigo-text"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div class="col-10 mb-2">
                                            <h5 class="feature-title font-bold mb-1">ABCD</h5>
                                            <p class="grey-text mt-2">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Consectetur voluptas natus iusto quo adipisci ratione
                                                nesciunt numquam tempore voluptatem beatae, dolorem
                                                molestiae! Nostrum at quas ullam reprehenderit esse
                                                soluta recusandae!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-6">
                                    <div class="row">
                                        <div class="col-2">
                                            <i
                                                class="fas fa-comments fa-2x mb-1 indigo-text"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div class="col-10 mb-2">
                                            <h5 class="feature-title font-bold mb-1">ABCD</h5>
                                            <p class="grey-text mt-2">
                                                Lorem, ipsum dolor sit amet consectetur adipisicing
                                                elit. Possimus architecto magnam reiciendis, sunt totam
                                                sequi quidem aspernatur nisi sed voluptatibus hic
                                                tempore alias. Ad eveniet tempora quas sit quo
                                                laboriosam?
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-6">
                                    <div class="row">
                                        <div class="col-2">
                                            <i
                                                class="fas fa-code fa-2x mb-1 indigo-text"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div class="col-10 mb-2">
                                            <h5 class="feature-title font-bold mb-1">ABCD</h5>
                                            <p class="grey-text mt-2">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Id, perspiciatis unde dolor commodi quo veritatis harum,
                                                totam, distinctio nemo earum aperiam quia eveniet animi
                                                tenetur quam porro quis optio. Ipsa.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row features-small mt-4 wow fadeIn">
                                <div class="col-xl-3 col-lg-6">
                                    <div class="row">
                                        <div class="col-2">
                                            <i
                                                class="fas fa-cubes fa-2x mb-1 indigo-text"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div class="col-z10 mb-2">
                                            <h5 class="feature-title font-bold mb-1">ABCD</h5>{" "}
                                            <p class="grey-text mt-2">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. Mollitia maxime illum adipisci quas laboriosam.
                                                Quo reiciendis necessitatibus nulla vel earum aliquam
                                                iure perspiciatis in quidem, voluptate sunt enim maxime
                                                voluptatum?
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-6">
                                    <div class="row">
                                        <div class="col-2">
                                            <i
                                                class="fas fa-question fa-2x mb-1 indigo-text"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div class="col-10 mb-2">
                                            <h5 class="feature-title font-bold mb-1">ABCD</h5>
                                            <p class="grey-text mt-2">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Animi quod ipsum doloribus earum vero! Optio mollitia
                                                ipsam voluptatum, soluta quia tempora debitis possimus
                                                consequuntur neque quos vel atque et odit!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-6">
                                    <div class="row">
                                        <div class="col-2">
                                            <i
                                                class="fas fa-th fa-2x mb-1 indigo-text"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div class="col-10 mb-2">
                                            <h5 class="feature-title font-bold mb-1">ABCD</h5>{" "}
                                            <p class="grey-text mt-2">
                                                Lorem ipsum dolor sit, amet consectetur adipisicing
                                                elit. Sed quasi nulla obcaecati. Hic voluptas tempora
                                                libero soluta optio facilis, aperiam cum unde. Quisquam
                                                illo iusto totam quia optio molestias doloribus?
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-lg-6">
                                    <div class="row">
                                        <div class="col-2">
                                            <i
                                                class="far fa-file-code fa-2x mb-1 indigo-text"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div class="col-10 mb-2">
                                            <h5 class="feature-title font-bold mb-1">ABCD</h5>
                                            <p class="grey-text mt-2">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Accusamus officiis assumenda officia temporibus, esse
                                                quod possimus voluptas corporis eum atque dolorum,
                                                eligendi, eaque libero rerum vitae maiores tempore
                                                excepturi modi!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    loginResponse: state.user.loginResponse,
    SignUpResponse: state.user.SignUpResponse,
});

export default connect(mapStateToProps, {LoginUser, RegisterUser})(Landing);
