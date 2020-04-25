import {Component} from "react";
import Joi from "joi-browser";
import {storage} from "../../utils/firebase";

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

    handleAddress = (e) => {
        const errors = {...this.state.errors};
        if (e === undefined) {
            errors["address"] = "Please enter your Address";
        } else delete errors["address"];

        let data = this.state.address;
        data = e.description;
        this.setState({address: data, errors});
    };

    handlePhone = (e) => {
        const errors = {...this.state.errors};
        if (!/^\({1}\d{3}\){1}\s{1}\d{3}-\d{4}$/.test(e.target.value)) {
            errors["phone"] = "Contact Number should have 10 digits";
        } else delete errors["phone"];


        let data = this.state.phone;
        data = e.target.value;
        this.setState({phone: data, errors});
    };

    handleGender = (e) => {
        const errors = {...this.state.errors};
        if (e.target.value === undefined) {
            errors["gender"] = "Please select your gender";
        } else delete errors["gender"];


        let data = this.state.gender;
        data = e.target.value;

        this.setState({gender: data, errors});
    };

    handleDateOfBirth = (e) => {
        const errors = {...this.state.errors};

        var date = new Date();
        date.setDate(date.getDate() + 1);
        date.setFullYear(date.getFullYear() - 18);

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

    handleFollowersCount = (e) => {
        const errors = {...this.state.errors};
        if (e.target.value.length == 0) {
            errors["followersCount"] = "Please enter Number of Followers";
        } else if (!/^\d*$/.test(e.target.value)) {
            errors["followersCount"] = "Number of Followers should have digits only";
        } else delete errors["followersCount"];

        let data = this.state.followersCount;
        data = e.target.value;
        this.setState({followersCount: data, errors});
    };

    handleUpload = (e) => {
        const image = e.target.files[0];
        if (image) {
            this.setState({image: image});
        }

        // TODO: get email from local storage
        const email = "sheena@gmail.com";
        const fileName = email + "_" + image.name;

        const uploadTask = storage.ref("users/" + fileName).put(image);
        uploadTask.on("state_changed",
            (snapshot) => {
            },
            (error) => {
                console.log("error in uploading user image= " + JSON.stringify(error));
            },
            () => {
                storage.ref("users")
                    .child(fileName).getDownloadURL().then(url => {
                    this.setState({url: url})
                })
            });
    };
}

export default UserProfileFormEventHandlers;
