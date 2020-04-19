import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "react-widgets/dist/css/react-widgets.css";
import moment from "moment";
import momentLocaliser from "react-widgets-moment";
import "../../css/postTask.css";
import PostTaskFormEventHandlers from "./PostTaskFormEventHandlers";
import {saveTask} from "../../actions/taskActions";

momentLocaliser(moment);

class PostTask extends PostTaskFormEventHandlers {
    constructor(props) {
        super(props);

        this.state = {
            postedBy: "",
            title: "",
            description: "",
            salary: "",
            category: "",
            vacancyCount: "",
            startDate: "",
            endDate: "",
            errors: {},
            photos: []
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSalary = this.handleSalary.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleVacancyCount = this.handleVacancyCount.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
    }

    schema = {
        title: Joi.string()
            .max(30)
            .min(5)
            .required()
            .label("Title"),
        description: Joi.string()
            .max(5000)
            .min(50)
            .required()
            .label("Description"),
        salary: Joi.string()
            .max(9)
            .min(1)
            .required()
            .regex(/^\d{1,6}(?:\.\d{0,2})?$/) // max 6 digits without decimal and max 2 digits after decimal
            .label("Salary"),
        vacancyCount: Joi.string()
            .required()
            .max(3)
            .min(1)
            .regex(/^[0-9]*$/)
            .label("Vacancy Count"),
    };

    onCancel = (e) => {
        window.location.reload();
    }

    onSubmit = (e) => {
        e.preventDefault();

        // TODO: Get username from local storage
        const postedBy = "sheena@gmail.com";

        const data = {
            postedBy: postedBy,
            title: this.state.title,
            description: this.state.description,
            salary: this.state.salary,
            category: this.state.category,
            vacancyCount: this.state.vacancyCount,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };

        this.props.saveTask(data).then(() => {
            if (this.props.saved) {
                window.alert("Task saved successfully!");
                window.location.reload();
            } else {
                window.alert("Task could not be saved. Please try again later.");
            }
        });
    };

    render() {
        // TODO: if user is not logged in, redirect to home

        if (false) { // TODO: check if user is not sponsor (role comes from local storage)
            return (
                <React.Fragment>
                    <p className="not_found">Access Denied.</p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="main">
                        <form>
                            <div className="form-body">
                                <div className="form_body_left">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            placeholder="Title"
                                            onChange={this.handleTitle}
                                            name="title"
                                            value={this.state.title}
                                            autoFocus={true}
                                            error={this.state.errors.title}
                                        />
                                        {this.state.errors.title && (
                                            <div className="error">
                                                {this.state.errors.title}{" "}
                                            </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        id="description"
                                        rows={7}
                                        onChange={this.handleDescription}
                                        placeholder="Description"
                                        error={this.state.errors.description}
                                        value={this.state.description}
                                    />
                                        {this.state.errors.description && (
                                            <div className="error">{this.state.errors.description} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="salary"
                                            placeholder="Salary"
                                            onChange={this.handleSalary}
                                            name="salary"
                                            value={this.state.salary}
                                            error={this.state.errors.salary}
                                        />
                                        {this.state.errors.salary && (
                                            <div className="error">{this.state.errors.salary} </div>
                                        )}
                                    </div>
                                    <br/>
                                </div>

                                <div className="form_body_right">
                                    <b>
                                        <label>Start Date: &nbsp; </label>
                                    </b>
                                    <DateTimePicker
                                        onChange={this.handleStartDate}
                                        name="startDate"
                                        id="startDate"
                                        time={false}
                                        placeholder="Start Date"
                                        error={this.state.errors.startDate}
                                    />
                                    {this.state.errors.startDate && (
                                        <div className="error">{this.state.errors.startDate} </div>
                                    )}
                                    <br/>

                                    <b>
                                        <label>End Date: &nbsp; </label>
                                    </b>
                                    <DateTimePicker
                                        onChange={this.handleEndDate}
                                        name="endDate"
                                        id="endDate"
                                        time={false}
                                        placeholder="End Date"
                                        error={this.state.errors.endDate}
                                    />
                                    {this.state.errors.endDate && (
                                        <div className="error">{this.state.errors.endDate} </div>
                                    )}
                                    <br/>
                                    <div className="form-group ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="vacancyCount"
                                            placeholder="Vacancy Count"
                                            onChange={this.handleVacancyCount}
                                            name="vacancyCount"
                                            error={this.state.errors.vacancyCount}
                                        />
                                        {this.state.errors.vacancyCount && (
                                            <div className="error">{this.state.errors.vacancyCount} </div>
                                        )}
                                    </div>
                                    <br/>

                                    <div className="form-group">
                                        <b>
                                            <label>Category: </label>
                                        </b>
                                        <select
                                            className="form-control"
                                            name="category"
                                            id="category"
                                            placeholder="Category"
                                            onChange={this.handleCategory}
                                        >
                                            <option value="" selected disabled>Select Category</option>
                                            <option value="Movies & TV"> Movies & TV</option>
                                            <option value="Food">Food</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Sports & Outdoors">Sports & Outdoors</option>
                                            <option value="Fitness & Gym">Fitness & Gym</option>
                                            <option value="Automobile">Automobile</option>
                                            <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                                            <option value="Video Games">Video Games</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Health">Health</option>
                                            <option value="Education">Education</option>
                                            <option value="Photography">Photography</option>
                                        </select>
                                    </div>
                                    <br/>

                                </div>
                            </div>

                            <div className="form_body_bottom">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                    </div>
                                    <div className="custom-file">
                                        // TODO: Add Photos
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="photos"
                                            name="photos"
                                            multiple={true}
                                            aria-describedby="inputGroupFileAddon01"/>
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose
                                            file</label>
                                    </div>
                                </div>
                            </div>

                            <div className="buttons">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg"
                                    onClick={this.onSubmit}
                                    disabled={Object.keys(this.state.errors).length !== 0}
                                >
                                    Save
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-danger btn-lg"
                                    onClick={this.onCancel}
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                </React.Fragment>
            )
                ;
        }
    }
}

PostTask.propTypes = {
    saveTask: PropTypes.func.isRequired,
};

PostTask = reduxForm({
    form: "postTaskForm",
})(PostTask);

PostTask = connect(
    (state) => ({
        saved: state.task.saved,
    }),
    {saveTask}
)(PostTask);

export default PostTask;
