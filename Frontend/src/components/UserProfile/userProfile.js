import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import {DatePicker} from "@material-ui/pickers";
import "react-widgets/dist/css/react-widgets.css";
import {If} from "react-if";
import UserProfileFormEventHandlers from "./userProfileFormEventHandlers";
import {getProfile, saveProfile} from "../../actions/userProfileActions";
import "../../css/userProfile.css";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PublicIcon from '@material-ui/icons/Public';
import InputAdornment from '@material-ui/core/InputAdornment';
import ExploreIcon from '@material-ui/icons/Explore';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import BusinessIcon from '@material-ui/icons/Business';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const userRoles = require("../../utils/Constants").UserRoles;
const TaskCategories = require("../../utils/Constants").TaskCategories;
const Gender = require("../../utils/Constants").Gender;


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));

class UserProfile extends UserProfileFormEventHandlers {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
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
            exists: false,
            role: "",
            company: "",
            isCurrentUser: true //to different between current user and the visiting user
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
        aboutMe: Joi.string().max(3000).label("About me"),
        streetAddress: Joi.string().max(30).label("Street Address"),
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
        company: Joi.string().max(20).required().label("Company"),
    };

    componentDidMount() {
        if (this.props.location.state)
            this.setState({isCurrentUser: false})

        // TODO: Get username from local storage
        const username = this.props.location.state ? this.props.location.state.email : "divjyot@gmail.com";

        this.props.getProfile(username, (response) => {
            if (response.status === 200) {
                this.setState({exists: true});
                this.setState({
                    firstName: response.data.message.name
                        ? response.data.message.name.firstName
                        : "",
                    lastName: response.data.message.name
                        ? response.data.message.name.lastName
                        : "",
                    aboutMe: response.data.message.aboutMe,
                    city: response.data.message.address
                        ? response.data.message.address.city
                        : "",
                    streetAddress: response.data.message.address
                        ? response.data.message.address.streetAddress
                        : "",
                    state: response.data.message.address
                        ? response.data.message.address.state
                        : "",
                    country: response.data.message.address
                        ? response.data.message.address.country
                        : "",
                    zipcode: response.data.message.address
                        ? response.data.message.address.zipcode
                        : "",
                    gender: response.data.message.gender,
                    phone: response.data.message.phone,
                    dateOfBirth: response.data.message.dateOfBirth,
                    taskCategories:
                        response.data.role === userRoles.INFLUENCER
                            ? response.data.message.taskCategories
                            : "",
                    role: response.data.role,
                    company:
                        response.data.role === userRoles.SPONSOR
                            ? response.data.message.company
                            : "",
                });
            }
        });
    }

    handleProfile = (e) => {
        e.preventDefault();
        // TODO: Get username from local storage
        const email = "sheena@gmail.com";

        const data = {
            name: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            },
            address: {
                streetAddress: this.state.streetAddress,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                zipcode: this.state.zipcode,
            },
            aboutMe: this.state.aboutMe,
            phone: this.state.phone,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            taskCategories: this.state.taskCategories,
            company: this.state.company,
        };

        this.props.saveProfile(data, email).then(() => {
            if (this.props.updated) {
                window.location.reload();
                window.alert("Profile updated successfully!");
            } else
                window.alert("Profile could not be updated. Please try again later.");
        });
    };

    checkDisable() {
        return this.state.firstName == "" ||
            this.state.lastName == "" ||
            this.state.streetAddress == "" ||
            this.state.city == "" ||
            this.state.state == "" ||
            this.state.country == "" ||
            this.state.zipcode == "" ||
            this.state.gender === undefined ||
            this.state.phone == "" ||
            new Date(this.state.dateOfBirth).setHours(0, 0, 0, 0)
            === new Date().setHours(0, 0, 0, 0) ||
            this.state.aboutMe === undefined ||
            (this.state.taskCategories == "" && this.state.company === undefined);
    }

    render() {
        // TODO: if user is not logged in, redirect to home

        const {classes} = this.props;

        if (!this.state.exists) {
            return (
                <React.Fragment>
                    <div className="profile-main">
                        <div className="main-background">
                            <p className="not_found">Profile does not exist</p>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="profile-main">
                        <div className="main-background">

                            <div className="display_photo">
                                <img
                                    // TODO: add image
                                    src="https://source.unsplash.com/random"
                                    width="300"
                                    height="200"
                                    alt="User has not uploaded anything yet"
                                />
                                <If condition={this.state.isCurrentUser === true}>
                                    <input
                                        type="file"
                                        name="files"
                                        // onChange={this.onPhotoChange}
                                    />
                                </If>
                            </div>

                            <div className="profileName">
                                {this.state.firstName} {this.state.lastName}
                            </div>

                            <form className={classes.root}>
                                <div className="profile_body">
                                    <div className="profile_information_left">
                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleFirstName}
                                            name="firstName"
                                            value={this.state.firstName}
                                            autoFocus={true}
                                            required
                                            error={this.state.errors.firstName}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.firstName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="First Name"/>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleLastName}
                                            name="lastName"
                                            value={this.state.lastName}
                                            required
                                            error={this.state.errors.lastName}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.lastName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Last Name"/>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleStreetAddress}
                                            name="streetAddress"
                                            value={this.state.streetAddress}
                                            required
                                            error={this.state.errors.streetAddress}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.streetAddress}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <HomeIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Street Address"/>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleCity}
                                            name="city"
                                            value={this.state.city}
                                            required
                                            error={this.state.errors.city}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.city}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationCityIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="City"/>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleState}
                                            name="state"
                                            value={this.state.state}
                                            required
                                            error={this.state.errors.state}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.state}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOnIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="State"/>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleCountry}
                                            name="country"
                                            value={this.state.country}
                                            required
                                            error={this.state.errors.country}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.country}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PublicIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Country"/>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleZipcode}
                                            name="zipcode"
                                            value={this.state.zipcode}
                                            required
                                            error={this.state.errors.zipcode}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.zipcode}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ExploreIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Zipcode"/>
                                        <br/>
                                        <br/>

                                        <FormControl className="classes.formControl input-field" required>
                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                value={this.state.gender}
                                                onChange={this.handleGender}
                                                onClick={this.handleGender}
                                                name="gender"
                                                error={this.state.errors.gender}
                                                disabled={this.state.isCurrentUser === false}
                                                required
                                            >

                                                {Gender.map(value => (
                                                    <MenuItem value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText><span
                                                className="error"> {this.state.errors.gender}</span></FormHelperText>
                                        </FormControl>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handlePhone}
                                            name="phone"
                                            value={this.state.phone}
                                            required
                                            error={this.state.errors.phone}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.phone}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ContactPhoneIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Contact Number"/>
                                        <br/>
                                        <br/>
                                    </div>

                                    <div className="profile_information_right">
                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleAboutMe}
                                            name="aboutMe"
                                            value={this.state.aboutMe}
                                            required
                                            error={this.state.errors.aboutMe}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.aboutMe}
                                            multiline
                                            rows={8}
                                            variant="outlined"
                                            label="About Me"/>
                                        <br/>
                                        <br/>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">
                                                <DatePicker
                                                    variant="inline"
                                                    className="input-date"
                                                    label="Date of Birth*"
                                                    format="dd MMMM yyyy"
                                                    value={new Date(this.state.dateOfBirth)}
                                                    onChange={this.handleDateOfBirth}
                                                    name="dateOfBirth"
                                                    error={this.state.errors.dateOfBirth}
                                                    disabled={this.state.isCurrentUser === false}
                                                    helperText={this.state.errors.dateOfBirth}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                        <br/>

                                        <If condition={this.state.role === userRoles.SPONSOR}>
                                            <div>
                                                <TextField
                                                    error
                                                    className="input-field"
                                                    onChange={this.handleCompany}
                                                    name="company"
                                                    value={this.state.company}
                                                    required
                                                    error={this.state.errors.company}
                                                    disabled={this.state.isCurrentUser === false}
                                                    helperText={this.state.errors.company}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <BusinessIcon/>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    label="Company"/>
                                                <br/>
                                                <br/>
                                            </div>
                                        </If>

                                        <If condition={this.state.role === userRoles.INFLUENCER}>
                                            <div className="form-group">

                                                <label className="task-categories">
                                                    <small>Task Categories</small>
                                                </label>

                                                <div className="form-check">
                                                    {TaskCategories.map(value => (
                                                        <div>
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value={value}
                                                                id={value}
                                                                onChange={this.handleTaskCategories}
                                                                checked={this.state.taskCategories.includes(
                                                                    value)}
                                                                disabled={this.state.isCurrentUser === false}
                                                            />
                                                            <label className="form-check-label" htmlFor={value}>
                                                                {value}
                                                            </label>
                                                            <br/>
                                                        </div>
                                                    ))}
                                                </div>
                                                <br/>
                                            </div>
                                        </If>
                                    </div>
                                </div>

                                <If condition={this.state.isCurrentUser}>
                                    <div className="submit_button">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={classes.button}
                                            disabled={Object.keys(this.state.errors).length !== 0 || this.checkDisable()}
                                            onClick={this.handleProfile}
                                            startIcon={<SaveIcon/>}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </If>
                            </form>
                        </div>
                    </div>
                </React.Fragment>

            );
        }
    }
}


UserProfile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    updated: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        profile: state.userProfile.profile,
        updated: state.userProfile.updated,
    };
}

UserProfile = reduxForm({
    form: "userProfileForm",
})(UserProfile);

UserProfile = connect(
    mapStateToProps,
    {getProfile, saveProfile}
)(UserProfile);


UserProfile = (withStyles(useStyles)(UserProfile))

export default UserProfile;


