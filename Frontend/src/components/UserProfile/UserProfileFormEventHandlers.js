import {Component} from "react";
import Joi from "joi-browser";

class UserProfileFormEventHandlers extends Component {
    state = {
        errors: {},
    };

    handleSubmit = (e) => {
        e.preventDefault(); //to avoid full page loading

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        this.doSubmit();
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

    handleAboutMe = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.aboutMe;
        data = e.target.value;
        this.setState({aboutMe: data, errors});
    };

    handleCity = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.city;
        data = e.target.value;
        this.setState({city: data, errors});
    };

    handleStreetAddress = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.streetAddress;
        data = e.target.value;
        this.setState({streetAddress: data, errors});
    };

    handleState = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.state;
        data = e.target.value;
        this.setState({state: data, errors});
    };

    handleCountry = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.country;
        data = e.target.value;
        this.setState({country: data, errors});
    };

    handleZipcode = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.zipcode;
        data = e.target.value;
        this.setState({zipcode: data, errors});
    };

    handlePhone = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.phone;
        data = e.target.value;
        this.setState({phone: data, errors});
    };

    handleGender = (e) => {
        this.setState({
            gender: e.target.value,
        });
    };

    handleDateOfBirth = (e) => {
        const errors = {...this.state.errors};

        var date = new Date();
        date.setDate( date.getDate() + 1 );
        date.setFullYear( date.getFullYear() - 18 );

        if (e > date)
            errors["dateOfBirth"] = "You should be at least 18 years old";
        else delete errors["dateOfBirth"];

        let data = this.state.dateOfBirth;
        data = e;
        this.setState({dateOfBirth: data, errors});
    };

    handleTaskCategories = (e) => {
        var joined = [];
        if (e.target.checked)
            joined = this.state.taskCategories.concat(e.target.value);
        else
            joined = this.state.taskCategories.filter(function (category) {
                return category !== e.target.value;
            });

        this.setState({
            taskCategories: joined,
        });
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
}

export default UserProfileFormEventHandlers;
