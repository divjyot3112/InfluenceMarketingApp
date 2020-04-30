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
        this.setState({
            firstName: e.target.value,
        });
    };
    handleLastName = (e) => {
        this.setState({
            lastName: e.target.value,
        });
    };
    handleEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };
    handlePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };
    handlePhone = (e) => {
        this.setState({
            phone: e.target.value,
        });
    };

    handleRole = (e) => {
        this.setState({
            enabled: true,
            isSponsor: true
        });

        if (this.state.role === userRoles.SPONSOR)
            this.setState({role: userRoles.INFLUENCER})
        else this.setState({role: userRoles.SPONSOR})
    };

    handleCompany = (e) => {
        this.setState({
            company: e.target.value,
        });
    };

    handleFollowersCount = (e) => {
        this.setState({
            followersCount: e.target.value,
        });
    };


}

export default LandingPageFormEventHandlers;
