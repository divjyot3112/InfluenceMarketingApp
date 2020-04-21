import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import "react-widgets/dist/css/react-widgets.css";
import "../../css/postTask.css";
import PostTaskFormEventHandlers from "./PostTaskFormEventHandlers";
import {saveTask} from "../../actions/taskActions";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PeopleIcon from '@material-ui/icons/People';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import 'date-fns';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

const TaskCategories = require("../../utils/Constants").TaskCategories;

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

    checkDisable() {
        return this.state.title == "" ||
            this.state.description == "" ||
            this.state.salary == "" ||
            this.state.category == "" ||
            this.state.vacancyCount == "" ||
            this.state.startDate == "" ||
            this.state.endDate == "";
    }

    render() {
        // TODO: if user is not logged in, redirect to home
        const {classes} = this.props;

        if (false) { // TODO: check if user is not sponsor (role comes from local storage)
            return (
                <React.Fragment>
                    <p className="not_found">Access Denied.</p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="main-post-task">
                        <div className="main-background">
                            <form className={classes.root}>
                                <div className="form-body">
                                    <div className="form_body_left">
                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleTitle}
                                            name="title"
                                            value={this.state.title}
                                            autoFocus={true}
                                            required
                                            error={this.state.errors.title}
                                            helperText={this.state.errors.title}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ViewHeadlineIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Title"/>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleDescription}
                                            name="description"
                                            value={this.state.description}
                                            required
                                            error={this.state.errors.description}
                                            helperText={this.state.errors.description}
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            label="Description"/>
                                        <br/>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleSalary}
                                            name="salary"
                                            value={this.state.salary}
                                            required
                                            error={this.state.errors.salary}
                                            helperText={this.state.errors.salary}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoneyIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Salary"/>
                                        <br/>
                                        <br/>
                                    </div>

                                    <div className="form_body_right">

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">
                                                <DatePicker
                                                    variant="inline"
                                                    className="input-date"
                                                    label="Start Date"
                                                    format="dd MMMM yyyy"
                                                    value={new Date(this.state.startDate)}
                                                    onChange={this.handleStartDate}
                                                    name="startDate"
                                                    error={this.state.errors.startDate}
                                                    helperText={this.state.errors.startDate}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                        <br/>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">
                                                <DatePicker
                                                    variant="inline"
                                                    className="input-date"
                                                    label="End Date"
                                                    format="dd MMMM yyyy"
                                                    value={new Date(this.state.endDate)}
                                                    onChange={this.handleEndDate}
                                                    name="endDate"
                                                    error={this.state.errors.endDate}
                                                    helperText={this.state.errors.endDate}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                        <br/>

                                        <TextField
                                            error
                                            className="input-field"
                                            onChange={this.handleVacancyCount}
                                            name="vacancyCount"
                                            value={this.state.vacancyCount}
                                            required
                                            error={this.state.errors.vacancyCount}
                                            helperText={this.state.errors.vacancyCount}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PeopleIcon/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            label="Vacancy Count"/>
                                        <br/>
                                        <br/>

                                        <FormControl className="classes.formControl input-field" required>
                                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.category}
                                                onChange={this.handleCategory}
                                                onClick={this.handleCategory}
                                                name="category"
                                                error={this.state.errors.category}
                                                required
                                            >
                                                {TaskCategories.map(value => (
                                                    <MenuItem value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText><span
                                                className="error"> {this.state.errors.category}</span></FormHelperText>
                                        </FormControl>
                                        <br/>
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
                                                multiple={false}
                                                aria-describedby="inputGroupFileAddon01"/>
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose
                                                file</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="buttons">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="classes.button btn-save"
                                        disabled={Object.keys(this.state.errors).length !== 0 || this.checkDisable()}
                                        onClick={this.onSubmit}
                                        startIcon={<SaveIcon/>}
                                    >
                                        Save
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        className="classes.button btn-cancel"
                                        onClick={this.onCancel}
                                        startIcon={<DeleteIcon/>}
                                    >
                                        Cancel
                                    </Button>
                                </div>

                            </form>
                        </div>
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

PostTask = (withStyles(useStyles)(PostTask))

export default PostTask;
