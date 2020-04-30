import {Component} from "react";
import Joi from "joi-browser";

const userRoles = require("../../utils/Constants").UserRoles;

class LandingPageFormEventHandlers extends Component {
    state = {
        errors: {},
    };

    validate = () => {
        const options = {abortEarly: false};
        const result = Joi.validate(this.state.data, this.schema, options);

        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = (input) => {
        const obj = {[input.name]: input.value};
        const subSchema = {[input.name]: this.schema[input.name]};
        const {error} = Joi.validate(obj, subSchema); //should abort early
        return error ? error.details[0].message : null;
    };

    handleloginEmail = (e) => {
        this.setState({
            loginEmail: e.target.value,
        });
    };

    handleloginPassword = (e) => {
        this.setState({
            loginPassword: e.target.value,
        });
    };

    handleFirstName = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.firstName;
        data = e.target.value;
        this.setState({firstName: data, errors});
    };

    handleLastName = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.lastName;
        data = e.target.value;
        this.setState({lastName: data, errors});
    };

    handleEmail = (e) => {
        const errors = {...this.state.errors};

        if (e.target.value.length == 0) {
            errors["email"] = "Email cannot be empty";
        } else if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)) {
            errors["email"] = "Incorrect email format";
        } else delete errors["email"];

        let data = this.state.email;
        data = e.target.value;
        this.setState({email: data, errors});
    };

    handlePassword = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.password;
        data = e.target.value;
        this.setState({password: data, errors});
    };

    handlePhone = (e) => {
        const errors = {...this.state.errors};

        if (e.target.value.length == 0) {
            errors["phone"] = "Contact Number cannot be empty";
        } else if (!/^\d{10}$/.test(e.target.value)) {
            errors["phone"] = "Contact Number should have 10 digits";
        } else delete errors["phone"];

        let data = this.state.phone;
        data = e.target.value;
        this.setState({phone: data, errors});
    };

    handleRole = (e) => {
        if (this.state.role === userRoles.SPONSOR)
            this.setState({role: userRoles.INFLUENCER})
        else this.setState({role: userRoles.SPONSOR})
    };

    handleCompany = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.company;
        data = e.target.value;
        this.setState({company: data, errors});
    };

    handleFollowersCount = (e) => {
        const errors = {...this.state.errors};
        if (e.target.value.length == 0) {
            errors["followersCount"] = "Number of Followers cannot be empty";
        } else if (!/^\d*$/.test(e.target.value)) {
            errors["followersCount"] = "Number of Followers should have digits only";
        } else delete errors["followersCount"];

        let data = this.state.followersCount;
        data = e.target.value;
        this.setState({followersCount: data, errors});
    };
}

export default LandingPageFormEventHandlers;