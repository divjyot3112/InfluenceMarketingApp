import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";
import Joi from "joi-browser";
import '../../css/userProfile.css';
import {getProfile} from "../../actions/userProfileActions";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
import FormEventHandlers from "./FormEventHandlers";
import {If} from "react-if";
import moment from "moment";
import momentLocaliser from "react-widgets-moment";

momentLocaliser(moment);

const userRoles = require('../../utils/Constants').UserRoles;

class UserProfile extends FormEventHandlers {

    constructor(props) {
        super(props);

        // TODO: fetch email from local storage
        this.state = {
            email: "sheena@gmail.com",
            firstName: "",
            lastName: "",
            aboutMe: "",
            city: "",
            streetAddress: "",
            state: "",
            country: "",
            zipcode: "",
            gender: "",
            phone: "",
            dateOfBirth: "",
            taskCategories: [],
            errors: {},
            exists: true,
            role: "",
            company: ""
        };

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleAboutMe = this.handleAboutMe.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleStreetAddress = this.handleStreetAddress.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        this.handleZipcode = this.handleZipcode.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
        this.handleTaskCategories = this.handleTaskCategories.bind(this);
        this.handleCompany = this.handleCompany.bind(this);
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
        aboutMe: Joi.string()
            .max(3000)
            .label("About me"),
        streetAddress: Joi.string()
            .max(30)
            .label("Street Address"),
        city: Joi.string()
            .max(20)
            .regex(/^[a-zA-Z\s]*$/)
            .label("City"),
        state: Joi.string()
            .max(5)
            .regex(/^[a-zA-Z\s]*$/)
            .label("State"),
        country: Joi.string()
            .max(20)
            .regex(/^[a-zA-Z\s]*$/)
            .label("Country"),
        zipcode: Joi.string()
            .min(5)
            .max(5)
            .regex(/^[0-9]*$/)
            .label("Zipcode"),
        phone: Joi.string()
            .max(10)
            .min(10)
            .regex(/^[0-9]*$/)
            .label("Contact Number"),
        company: Joi.string()
            .max(20)
            .required()
            .label("Company")
    };

    componentDidMount() {
        axios
            .get(`http://localhost:5000/api/users/profile?email=${this.state.email}`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    firstName: response.data.message.name ? response.data.message.name.firstName : "",
                    lastName: response.data.message.name ? response.data.message.name.lastName : "",
                    aboutMe: response.data.message.aboutMe,
                    city: response.data.message.address ? response.data.message.address.city : "",
                    streetAddress: response.data.message.address ? response.data.message.address.streetAddress : "",
                    state: response.data.message.address ? response.data.message.address.state : "",
                    country: response.data.message.address ? response.data.message.address.country : "",
                    zipcode: response.data.message.address ? response.data.message.address.zipcode : "",
                    gender: response.data.message.gender,
                    phone: response.data.message.phone,
                    dateOfBirth: response.data.message.dateOfBirth,
                    taskCategories: response.data.role === userRoles.INFLUENCER ? response.data.message.taskCategories : "",
                    role: response.data.role,
                    company: response.data.role === userRoles.SPONSOR ? response.data.message.company : ""
                })
            })
            .catch(error => {
                this.setState({exists: false})
            });
    }

    // this.props.getProfile("divjyot@gmail.com")
    //     .then((response) => {
    //         console.log("res=" + response);
    //
    //         this.setState({
    //             firstName: response ? response.name.firstName: "none"
    //             // lastName: response.name.lastName,
    //             // aboutMe: response.aboutMe,
    //             // city: response.address.city
    //             // company,
    //             // school,
    //             // hometown,
    //             // languages,
    //             // gender,
    //             // phone
    //         });
    //     });


    handleProfile = e => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            name: {
                firstName: this.state.firstName,
                lastName: this.state.lastName
            },
            address: {
                streetAddress: this.state.streetAddress,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                zipcode: this.state.zipcode
            },
            aboutMe: this.state.aboutMe,
            phone: this.state.phone,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            taskCategories: this.state.taskCategories
        };

        if (this.state.role === userRoles.SPONSOR)
            data.company = this.state.company


        axios
            .put(`http://localhost:5000/api/users/profile?email=${this.state.email}`, data)
            .then((response) => {
                window.location.reload();
                if (response.status === 200)
                    window.alert("Profile updated successfully!")
            })
            .catch(error => {
                window.alert(error.message);
            });
    };

    render() {
        // TODO: if user is not logged in, redirect to home
        if (!this.state.exists) {
            return (
                <React.Fragment>
                    <p className="not_found">Profile does not exist</p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="main">

                        <div className="display_photo">
                            <input
                                type="file"
                                name="files"
                                // onChange={this.onPhotoChange}
                            />
                            <img
                                // TODO: add image
                                src="https://source.unsplash.com/random"
                                width="300"
                                height="200"
                                alt="User has not uploaded anything yet"
                            />
                        </div>

                        <div className="profileName">
                            {this.state.firstName} {this.state.lastName}
                        </div>

                        <form>
                            <div className="profile_body">

                                <div className="profile_information_left">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="First Name"
                                            onChange={this.handleFirstName}
                                            name="firstName"
                                            value={this.state.firstName}
                                            autoFocus={true}
                                            error={this.state.errors.firstName}
                                        />
                                        {this.state.errors.firstName && (
                                            <div className="error">{this.state.errors.firstName} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Last Name"
                                            onChange={this.handleLastName}
                                            name="lastName"
                                            value={this.state.lastName}
                                            error={this.state.errors.lastName}
                                        />
                                        {this.state.errors.lastName && (
                                            <div className="error">{this.state.errors.lastName} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="streetAddress"
                                            placeholder="Street Address"
                                            onChange={this.handleStreetAddress}
                                            name="streetAddress"
                                            value={this.state.streetAddress}
                                            error={this.state.errors.streetAddress}
                                        />
                                        {this.state.errors.streetAddress && (
                                            <div className="error">{this.state.errors.streetAddress} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            placeholder="City"
                                            name="city"
                                            onChange={this.handleCity}
                                            value={this.state.city}
                                            error={this.state.errors.city}
                                        />
                                        {this.state.errors.city && (
                                            <div className="error">{this.state.errors.city} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="state"
                                            placeholder="State"
                                            name="state"
                                            onChange={this.handleState}
                                            value={this.state.state}
                                            error={this.state.errors.state}
                                        />
                                        {this.state.errors.state && (
                                            <div className="error">{this.state.errors.state} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            placeholder="Country"
                                            name="country"
                                            onChange={this.handleCountry}
                                            value={this.state.country}
                                            error={this.state.errors.country}
                                        />
                                        {this.state.errors.country && (
                                            <div className="error">{this.state.errors.country} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="zipcode"
                                            placeholder="Zipcode"
                                            name="zipcode"
                                            onChange={this.handleZipcode}
                                            value={this.state.zipcode}
                                            error={this.state.errors.zipcode}
                                        />
                                        {this.state.errors.zipcode && (
                                            <div className="error">{this.state.errors.zipcode} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <select
                                        className="form-control"
                                        name="gender"
                                        id="gender"
                                        placeholder="Gender"
                                        value={this.state.gender}
                                        onChange={this.handleGender}>
                                        <option value="Gender" disabled={true} selected={true}>Select Gender
                                        </option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <br/>

                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Contact Number"
                                            name="phone"
                                            onChange={this.handlePhone}
                                            value={this.state.phone}
                                            error={this.state.errors.phone}
                                        />
                                        {this.state.errors.phone && (
                                            <div className="error">{this.state.errors.phone} </div>
                                        )}
                                    </div>
                                </div>

                                <div className="profile_information_right">
                                    <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                name="aboutMe"
                                                id="aboutMe"
                                                rows={8}
                                                onChange={this.handleAboutMe}
                                                placeholder="About me"
                                                error={this.state.errors.aboutMe}
                                                value={this.state.aboutMe}
                                            />
                                        {this.state.errors.aboutMe && (
                                            <div className="error">{this.state.errors.aboutMe} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <b><label>Date of Birth: &nbsp; </label></b>
                                    <DateTimePicker
                                        onChange={this.handleDateOfBirth}
                                        value={new Date(this.state.dateOfBirth)}
                                        name="dateOfBirth"
                                        id="dateOfBirth"
                                        time={false}
                                        placeholder="Date of Birth"
                                    />
                                    <br/>

                                    <If condition={this.state.role === userRoles.SPONSOR}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="company"
                                                placeholder="Company"
                                                onChange={this.handleCompany}
                                                name="company"
                                                value={this.state.company}
                                                error={this.state.errors.company}
                                            />
                                            {this.state.errors.company && (
                                                <div className="error">{this.state.errors.company} </div>
                                            )}
                                        </div>
                                    </If>

                                    <If condition={this.state.role === userRoles.INFLUENCER}>
                                        <div className="form-group">
                                            <b><label className="task-categories">Task Categories: &nbsp; </label></b>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="movies"
                                                       value="Movies & TV" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Movies & TV")}/>
                                                <label className="form-check-label" htmlFor="movies">Movies & TV</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="food"
                                                       value="Food" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Food")}/>
                                                <label className="form-check-label" htmlFor="food">Food</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="travel"
                                                       value="Travel" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Travel")}/>
                                                <label className="form-check-label" htmlFor="travel">Travel</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="sports"
                                                       value="Sports & Outdoors" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Sports & Outdoors")}/>
                                                <label className="form-check-label" htmlFor="sports">Sports &
                                                    Outdoors</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="fitness"
                                                       value="Fitness & Gym" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Fitness & Gym")}/>
                                                <label className="form-check-label" htmlFor="fitness">Fitness &
                                                    Gym</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="automobile"
                                                       value="Automobile" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Automobile")}/>
                                                <label className="form-check-label"
                                                       htmlFor="automobile">Automobile</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="personalCare"
                                                       value="Beauty and Personal Care"
                                                       onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Beauty and Personal Care")}/>
                                                <label className="form-check-label" htmlFor="personalCare">Beauty and
                                                    Personal
                                                    Care</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="videoGames"
                                                       value="Video Games" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Video Games")}/>
                                                <label className="form-check-label" htmlFor="videoGames">Video
                                                    Games</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="electronics"
                                                       value="Electronics" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Electronics")}/>
                                                <label className="form-check-label"
                                                       htmlFor="electronics">Electronics</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="health"
                                                       value="Health" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Health")}/>
                                                <label className="form-check-label" htmlFor="health">Health</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="education"
                                                       value="Education" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Education")}/>
                                                <label className="form-check-label"
                                                       htmlFor="education">Education</label>
                                                <br/>

                                                <input className="form-check-input" type="checkbox" id="photography"
                                                       value="Photography" onChange={this.handleTaskCategories}
                                                       checked={this.state.taskCategories.includes("Photography")}
                                                />
                                                <label className="form-check-label"
                                                       htmlFor="photography">Photography</label>
                                            </div>
                                        </div>
                                    </If>
                                </div>
                            </div>

                            <div className="submit_button">
                                <button type="submit" className="btn btn-primary" onClick={this.handleProfile}
                                        disabled={Object.keys(this.state.errors).length !== 0}>
                                    Save
                                </button>
                            </div>

                        </form>
                    </div>
                </React.Fragment>
            );
        }
    }
}

UserProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
};

UserProfile = reduxForm({
    form: "userProfileForm"
})(UserProfile);

UserProfile = connect(
    state => ({
        profile: state.userProfile.profile
    }),
    {getProfile}
)(UserProfile);

export default UserProfile;