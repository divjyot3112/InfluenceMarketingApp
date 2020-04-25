import {Component} from "react";
import Joi from "joi-browser";
import {storage} from "../../utils/firebase";

class PostTaskFormEventHandlers extends Component {
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

    handleTitle = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.title;
        data = e.target.value;
        this.setState({title: data, errors});
    };

    handleDescription = (e) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(e.currentTarget);
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage;
        } else delete errors[e.currentTarget.name];

        let data = this.state.description;
        data = e.target.value;
        this.setState({description: data, errors});
    };

    handleSalary = (e) => {
        const errors = {...this.state.errors};
        if (e.target.value.length == 0) {
            errors["salary"] = "Please enter Salary";
        } else delete errors["salary"];

        let data = this.state.salary;
        data = e.target.value;
        this.setState({salary: data, errors});
    };

    handleCategory = (e) => {
        const errors = {...this.state.errors};

        if (e.target.value === undefined) {
            errors["category"] = "Please select a task category";
        } else delete errors["category"];

        let data = this.state.category;
        data = e.target.value;
        this.setState({category: data, errors});
    };

    handleVacancyCount = (e) => {
        const errors = {...this.state.errors};

        if (e.target.value == "") {
            errors["vacancyCount"] = "Please enter the Vacancy Count";
        } else if (!/^\d{1}$/.test(e.target.value)) {
            errors["vacancyCount"] = "Vacancy Count should be a whole number";
        } else if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 5) {
            errors["vacancyCount"] = "Vacancy Count should be between 1 and 5";
        } else delete errors["vacancyCount"];

        let data = this.state.vacancyCount;
        data = e.target.value;
        this.setState({vacancyCount: data, errors});
    };

    handleStartDate = (e) => {
        const errors = {...this.state.errors};

        var date = new Date();

        if (e < date)
            errors["startDate"] = "Minimum Start Date can be tomorrow";
        else delete errors["startDate"];

        let data = this.state.startDate;
        data = e;
        this.setState({startDate: data, errors});
    };

    handleEndDate = (e) => {
        const errors = {...this.state.errors};
        let startDate = this.state.startDate

        if (startDate === "") {
            startDate = new Date()
            this.setState({startDate: startDate})
        }

        if (e <= startDate)
            errors["endDate"] = "End Date should be more Start Date";
        else delete errors["endDate"];

        let data = this.state.endDate;
        data = e;
        this.setState({endDate: data, errors});
    };

    onCancel = (e) => {
        window.location.reload();
    }

    handleUpload = (e) => {
        const image = e.target.files[0];
        if (image) {
            this.setState({image: image});

            // TODO: get email from local storage
            const email = "sheena@gmail.com";
            const fileName = email + "_" + image.name;

            const uploadTask = storage.ref("tasks/" + fileName).put(image);
            uploadTask.on("state_changed",
                (snapshot) => {
                },
                (error) => {
                    console.log("error in uploading task image= " + JSON.stringify(error));
                },
                () => {
                    storage.ref("tasks")
                        .child(fileName).getDownloadURL().then(url => {
                        this.setState({url: url})
                    })
                });
        }
    };

}

export default PostTaskFormEventHandlers;
