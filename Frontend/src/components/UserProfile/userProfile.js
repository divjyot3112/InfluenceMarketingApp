import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import {DatePicker} from "@material-ui/pickers";
import "react-widgets/dist/css/react-widgets.css";
import {If, Else, Then} from "react-if";
import UserProfileFormEventHandlers from "./userProfileFormEventHandlers";
import {getProfile, saveProfile} from "../../actions/userProfileActions";
import "../../css/userProfile.css";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import NumberFormat from "react-number-format";
import PeopleIcon from '@material-ui/icons/People';
import ExampleComponent from "react-rounded-image";
import UploadImageIcon from '../../images/uploadImageIcon.png';
import {getEmailFromLocalStorage} from "../Common/auth";

const userRoles = require("../../utils/Constants").UserRoles;
const TaskCategories = require("../../utils/Constants").TaskCategories;
const Gender = require("../../utils/Constants").Gender;
const NoImageFound = require("../../utils/Constants").NoImageFound;

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

// to format number of followers field
function NumberFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function TextMaskCustom(props) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

class UserProfile extends UserProfileFormEventHandlers {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            aboutMe: "",
            address: "",
            gender: "",
            phone: "",
            dateOfBirth: "",
            taskCategories: [],
            errors: {},
            exists: false,
            role: "",
            company: "",
            followersCount: "",
            isCurrentUser: true, //to different between current user and the visiting user
            loading: true,
            //firebase
            image: "",
            url: ""
        };

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleAboutMe = this.handleAboutMe.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
        this.handleTaskCategories = this.handleTaskCategories.bind(this);
        this.handleCompany = this.handleCompany.bind(this);
        this.handleFollowersCount = this.handleFollowersCount.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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
        company: Joi.string().max(20).required().label("Company"),
    };


    componentDidMount() {
        if (this.props.location.state)
            this.setState({isCurrentUser: false})

        const username = this.props.location.state ? this.props.location.state.email : getEmailFromLocalStorage();

        this.props.getProfile(username).then((response) => {
            if (response === undefined && this.props.profile.status === 200) {
                this.setState({exists: true});
                this.setState({
                    firstName: this.props.profile.data.message
                        ? this.props.profile.data.message.name.firstName
                        : "",
                    lastName: this.props.profile.data.message
                        ? this.props.profile.data.message.name.lastName
                        : "",
                    aboutMe: this.props.profile.data.message.aboutMe,
                    address: this.props.profile.data.message.address,
                    gender: this.props.profile.data.message.gender,
                    phone: this.props.profile.data.message.phone,
                    dateOfBirth: this.props.profile.data.message.dateOfBirth,
                    url: this.props.profile.data.message.image,
                    taskCategories:
                        this.props.profile.data.role === userRoles.INFLUENCER
                            ? this.props.profile.data.message.taskCategories
                            : "",
                    role: this.props.profile.data.role,
                    company:
                        this.props.profile.data.role === userRoles.SPONSOR
                            ? this.props.profile.data.message.company
                            : "",
                    followersCount:
                        this.props.profile.data.role === userRoles.INFLUENCER
                            ? this.props.profile.data.message.followersCount
                            : "",
                });
            }
            this.setState({loading: false})
        })
    }

    handleProfile = (e) => {
        e.preventDefault();
        const email = getEmailFromLocalStorage();

        const data = {
            name: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            },
            address: this.state.address,
            aboutMe: this.state.aboutMe,
            phone: this.state.phone,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            taskCategories: this.state.taskCategories,
            company: this.state.company,
            followersCount: this.state.followersCount,
            image: this.state.url === "" ? NoImageFound : this.state.url
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
            this.state.address === undefined ||
            this.state.gender === undefined ||
            this.state.phone == "" ||
            new Date(this.state.dateOfBirth).setHours(0, 0, 0, 0)
            === new Date().setHours(0, 0, 0, 0) ||
            this.state.aboutMe === undefined ||
            ((this.state.taskCategories == "" || this.state.followersCount === undefined) && this.state.company === "");
    }

    render() {
        const {classes} = this.props;

        if (!this.state.exists) {
            return (
                <React.Fragment>
                    <div className="profile-main">
                        <If condition={this.state.loading}>
                            <Then>
                                <p className="profile-not-found">
                                    <CircularProgress/>
                                    <CircularProgress color="secondary"/>
                                </p>
                            </Then>
                            <Else>
                                <p className="profile-not-found">Profile Not Found</p>
                            </Else>
                        </If>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="profile-main">
                        <div className="main-background">
                            <div className="photo-main">
                                <If condition={this.state.isCurrentUser === true}>
                                    <div className="edit-photo">
                                        <label htmlFor="image">
                                            <img src={UploadImageIcon} height="50" width="60"/>
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            multiple={false}
                                            onChange={this.handleUpload}
                                        />
                                    </div>
                                </If>

                                <div className="display_photo">
                                    <ExampleComponent
                                        image={this.state.url}
                                        roundedSize="0"
                                        imageWidth="300"
                                        imageHeight="300"
                                    />
                                </div>
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

                                        <small className="small-label address-label">Address*</small>
                                        <div className="address-autocomplete">
                                            <GooglePlacesAutocomplete
                                                onSelect={this.handleAddress}
                                                inputClassName="input-field-address"
                                                error={this.state.errors.address}
                                                placeholder={false}
                                                name="address"
                                                value={this.state.address}
                                                required={true}
                                                disabled={this.state.isCurrentUser === false}
                                                initialValue={this.state.address}
                                            />
                                        </div>
                                        <br/>

                                        <If condition={this.state.role === userRoles.INFLUENCER}>
                                            <div>
                                                <TextField
                                                    error
                                                    className="input-field"
                                                    onChange={this.handleFollowersCount}
                                                    name="followersCount"
                                                    value={this.state.followersCount}
                                                    required
                                                    error={this.state.errors.followersCount}
                                                    disabled={this.state.isCurrentUser === false}
                                                    helperText={this.state.errors.followersCount}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PeopleIcon/>
                                                            </InputAdornment>
                                                        ),
                                                        inputComponent: NumberFormatCustom,
                                                    }}
                                                    label="Number of Followers"/>
                                                <br/>
                                                <br/>
                                            </div>
                                        </If>

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
                                            onChange={this.handleAboutMe}
                                            name="aboutMe"
                                            value={this.state.aboutMe}
                                            required
                                            error={this.state.errors.aboutMe}
                                            disabled={this.state.isCurrentUser === false}
                                            helperText={this.state.errors.aboutMe}
                                            multiline
                                            rows={7}
                                            variant="outlined"
                                            label="About Me"/>
                                        <br/>
                                        <br/>
                                    </div>

                                    <div className="profile_information_right">
                                        <FormControl className="classes.formControl input-field" required>
                                            <InputLabel>Contact Number</InputLabel>
                                            <Input
                                                value={this.state.phone}
                                                onChange={this.handlePhone}
                                                name="phone"
                                                inputComponent={TextMaskCustom}
                                                error={this.state.errors.phone}
                                                disabled={this.state.isCurrentUser === false}
                                            />
                                            <FormHelperText><span
                                                className="error"> {this.state.errors.phone}</span></FormHelperText>
                                        </FormControl>
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

                                                <label className="small-label">
                                                    <small>Task Categories*</small>
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


