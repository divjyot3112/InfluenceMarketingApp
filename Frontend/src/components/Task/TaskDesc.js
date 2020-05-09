import React from "react";
import {Link, Redirect} from "react-router-dom";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import "react-widgets/dist/css/react-widgets.css";
import "../../css/postTask.css";
import PostTaskFormEventHandlers from "./PostTaskFormEventHandlers";
import {
    editTask,
    getTask,
    selectCandidates,
    getSelectedCandidateProfiles,
    deleteTask,
    getSponsorProfile,
    apply,
    markAsComplete
} from "../../actions/taskActions";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import Select from "@material-ui/core/Select";
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import 'date-fns';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import NumberFormat from 'react-number-format';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Image from 'material-ui-image';
import {getEmailFromLocalStorage, getRoleFromLocalStorage} from "../Common/auth";
import {TaskStatus, MY_USER_ID, MY_ROLE} from "../../utils/Constants";

const TaskCategories = require("../../utils/Constants").TaskCategories;
const NoImageFound = require("../../utils/Constants").NoImageFound;
const UserRoles = require("../../utils/Constants").UserRoles;

// for material-ui
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
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalStyle: {
        top: '50%',
        left: '50%',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 16;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 400,
        },
    },
};

// to format salary field
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
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

class PostTask extends PostTaskFormEventHandlers {
    constructor(props) {
        super(props);

        this.state = {
            appliedCandidates: [],
            selectCandidates: [],
            postedBy: "",
            title: "",
            description: "",
            salary: "",
            category: "",
            vacancyCount: "",
            startDate: "",
            endDate: "",
            errors: {},
            //firebase
            image: "",
            url: "",
            editMode: false,
            status: "",
            open: false,
            selected: [],
            sponsor: {}
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSalary = this.handleSalary.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleVacancyCount = this.handleVacancyCount.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.props.getTask(this.props.location.state)
                .then(res => {
                    const task = this.props.task
                    this.props.getSponsorProfile(task.postedBy)
                    console.log("Task " + task)
                    let viewSelected = task.postedBy === MY_USER_ID
                    if (task.selectedCandidates && task.selectedCandidates.length > 0 && !viewSelected) {
                        task.selectedCandidates.forEach(candidate => {
                            if (candidate === MY_USER_ID) {
                                viewSelected = true;
                            }
                        });
                    }
                    if (task.selectedCandidates && task.selectedCandidates.length === 0) viewSelected = false
                    console.log("viewSelected" + viewSelected)
                    if (viewSelected) {
                        this.props.getSelectedCandidateProfiles(task._id)
                    }
                    this.setState({
                        taskId: task._id,
                        postedBy: task.postedBy,
                        title: task.title,
                        description: task.description,
                        salary: task.salary,
                        category: task.category,
                        startDate: task.startDate,
                        endDate: task.endDate,
                        url: task.image,
                        vacancyCount: task.vacancyCount,
                        status: task.status,
                        appliedCandidates: task.appliedCandidates,
                        selectedCandidates: task.selectedCandidates,
                        selected: task.selectedCandidates ? task.selectedCandidates : [],
                        viewSelected: viewSelected,
                        redirect: null
                    })
                })
        }
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
            .label("Description")
    };

    checkDisable() {
        return this.state.title == "" ||
            this.state.description == "" ||
            this.state.salary == "" ||
            this.state.category == "" ||
            this.state.vacancyCount == "" ||
            this.state.startDate == "" ||
            this.state.endDate == "" ||
            !this.state.editMode;
    }

    markComplete = () => {
        this.props.markAsComplete(this.state.taskId, {email: this.postedBy})
            .then(() => {
                if (this.props.completed) {
                    window.alert("Task marked as complete")
                    window.location.reload();
                } else {
                    window.alert("Task couldn't be marked as complete...")
                }
            })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const postedBy = getEmailFromLocalStorage();

        const data = {
            postedBy: postedBy,
            title: this.state.title,
            description: this.state.description,
            salary: this.state.salary,
            category: this.state.category,
            vacancyCount: this.state.vacancyCount,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            image: this.state.url === "" ? NoImageFound : this.state.url
        };

        this.props.editTask(this.state.taskId, data).then(() => {
            if (this.props.edited) {
                window.alert("Task edited successfully!");
                window.location.reload();
            } else {
                window.alert("Task could not be edited. Please try again later.");
            }
        });
    };

    handleSelectCandidates = () => {
        this.props.selectCandidates(
            this.state.taskId,
            {
                selectedCandidates: this.state.selected,
                email: localStorage.getItem('email')
            }
        )
            .then(() => {
                if (this.props.selected) {
                    window.alert("Candidates Successfully Selected")
                    window.location.reload();
                } else {
                    window.alert("Candidates couldn't be selected...")
                }
            })
    }

    apply = () => {
        this.props.apply(this.state.taskId, {email: MY_USER_ID}).then(() => {
            if (this.props.applied) {
                window.alert("Successfully applied")
                window.location.reload();
            } else {
                window.alert("Could not apply for task")
            }
        })
    }

    onDelete = () => {
        this.props.deleteTask(this.state.taskId)
            .then(() => {
                this.toggle()
                if (this.props.deleted) {
                    window.alert("Task has been deleted")
                    this.setState({
                        redirect: "/home"
                    })
                } else {
                    window.alert("Task has selected candidates, cannot delete...")
                }
            })
    }

    render() {
        const {classes} = this.props;
        console.log(this.state)
        const profiles = this.props.profiles
        const sponsor = this.props.sponsor
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <React.Fragment>
                <div className="main-post-task">
                    <form className={classes.root}>
                        <div className="form_body_bottom">
                            <div style={{display: "inline"}}>
                                <b style={{float: "left", marginRight: "1%", padding: "1.5%"}}>Posted By:</b>
                                <Link
                                    to={{
                                        pathname: "/profile",
                                        state: {
                                            email: this.state.postedBy
                                        }
                                    }}
                                    style={{textDecoration: 'none', width: "100%"}}
                                >
                                    <Avatar
                                        src={sponsor.image}
                                        style={{marginRight: "1%", float: "left"}}
                                        className={classes.small}
                                    />
                                    <div style={{padding: "1.5%"}}>
                                        {" "} {sponsor.name ?
                                        sponsor.name.firstName + " " + sponsor.name.lastName : ""}
                                    </div>
                                </Link>
                                <br/>
                                <div style={{padding: "1.5%"}}>
                                    <b>Status: </b>{this.state.status}
                                </div>
                            </div>
                            <div
                                className="input-group mb-3"
                                style={{display: MY_USER_ID !== this.state.postedBy ? "none" : ""}}
                            >
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                </div>
                                <div
                                    className="custom-file"
                                >
                                    <input
                                        disabled={!this.state.editMode}
                                        type="file"
                                        className="custom-file-input"
                                        id="image"
                                        name="image"
                                        multiple={false}
                                        onChange={this.handleUpload}
                                        aria-describedby="inputGroupFileAddon01"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose
                                        File</label>
                                </div>
                            </div>

                            <Image
                                src={this.state.url}
                                aspectRatio={(16 / 9)}
                                disableSpinner
                            />
                        </div>

                        <div className="form-body">
                            <div className="form_body_left">
                                <TextField
                                    error
                                    disabled={!this.state.editMode}
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
                                    disabled={!this.state.editMode}
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
                                    disabled={!this.state.editMode}
                                    label="Salary"
                                    className="input-field"
                                    onChange={this.handleSalary}
                                    value={this.state.salary}
                                    required
                                    error={this.state.errors.salary}
                                    helperText={this.state.errors.salary}
                                    name="salary"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CreditCardIcon/>
                                            </InputAdornment>
                                        ),
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                                <br/>
                                <br/>
                            </div>

                            <div className="form_body_right">

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <DatePicker
                                            disabled={!this.state.editMode}
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
                                            disabled={!this.state.editMode}
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
                                    required
                                    disabled={!this.state.editMode}
                                    type="number"
                                    label="Vacancy Count"
                                    className="input-field"
                                    onChange={this.handleVacancyCount}
                                    value={this.state.vacancyCount}
                                    error={this.state.errors.vacancyCount}
                                    helperText={this.state.errors.vacancyCount}
                                    name="vacancyCount"
                                    inputProps={{min: "1", max: "5", step: "1"}}/>
                                <br/>
                                <br/>

                                <FormControl className="classes.formControl input-field" required>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        disabled={!this.state.editMode}
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

                        <div className="buttons">
                            <Button
                                disabled={
                                    MY_ROLE === UserRoles.SPONSOR ||
                                    this.state.status !== TaskStatus.CREATED ||
                                    (this.state.appliedCandidates.length > 0 ?
                                        this.state.appliedCandidates.includes(MY_USER_ID)
                                        : false)
                                }
                                style={{display: MY_ROLE === UserRoles.SPONSOR ? "none" : ""}}
                                variant="contained"
                                size="large"
                                className="classes.button btn-apply"
                                onClick={this.apply}
                                startIcon={<SendIcon/>}
                            >
                                Apply
                            </Button>
                            <Button
                                disabled={
                                    this.state.status !== TaskStatus.INPROGRESS
                                }
                                style={{
                                    display: MY_USER_ID !== this.state.postedBy ? "none" : "",
                                    marginLeft: "5%"
                                }}
                                variant="contained"
                                size="large"
                                className="classes.button"
                                onClick={this.markComplete}
                                startIcon={<CheckCircleIcon/>}
                            >
                                Mark as Complete
                            </Button>
                            <Button
                                id="submitButton"
                                style={{display: MY_USER_ID !== this.state.postedBy ? "none" : ""}}
                                variant="contained"
                                color="primary"
                                size="large"
                                className="classes.button btn-save2"
                                disabled={Object.keys(this.state.errors).length !== 0 || this.checkDisable()}
                                onClick={this.onSubmit}
                                startIcon={<SaveIcon/>}
                            >
                                Save
                            </Button>

                            <Button
                                disabled={this.state.status !== TaskStatus.CREATED}
                                style={{display: MY_USER_ID !== this.state.postedBy ? "none" : ""}}
                                variant="contained"
                                color="secondary"
                                size="large"
                                className="classes.button btn-cancel"
                                onClick={this.state.editMode ? this.onCancel : this.onEditClick}
                                startIcon={this.state.editMode ? <CloseIcon/> : <EditIcon/>}
                            >
                                {this.state.editMode ? "Cancel" : "Edit Task"}
                            </Button>
                            <Button
                                disabled={this.state.status !== TaskStatus.CREATED}
                                style={{
                                    display: MY_USER_ID !== this.state.postedBy ? "none" : ""
                                }}
                                variant="contained"
                                color="secondary"
                                size="large"
                                className="classes.button btn-cancel"
                                onClick={this.toggle}
                                startIcon={<DeleteIcon/>}
                            >
                                Delete Task
                            </Button>
                            <Dialog
                                open={this.state.open}
                                onClose={this.toggle}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Are you sure you want to delete this task?
                                </DialogTitle>
                                <DialogActions>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        className="classes.button btn-cancel"
                                        onClick={this.onDelete}
                                        startIcon={<DoneIcon/>}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="classes.button btn-cancel"
                                        onClick={this.toggle}
                                        startIcon={<CloseIcon/>}
                                    >
                                        No
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <hr/>
                        <div className="form-body" style={{marginBottom: "5%"}}>
                            <div
                                className="form_body_left"
                                style={{
                                    paddingBottom: "2%",
                                    display: this.state.postedBy === localStorage.getItem('email')
                                    && this.state.status === TaskStatus.CREATED
                                    && this.state.appliedCandidates.length > 0 ?
                                        "block" : "none"
                                }}
                            >
                                {/*To display this if task status is created + sponsor=postedby*/}
                                <h4>Select Candidates for the task</h4>
                                <FormControl className="classes.formControl input-field">
                                    <InputLabel id="demo-mutiple-name-label">Select</InputLabel>
                                    <Select
                                        disabled={this.state.appliedCandidates.length === 0}
                                        labelId="demo-mutiple-name-label"
                                        id="demo-mutiple-name"
                                        multiple
                                        value={this.state.selected}
                                        onChange={this.handleSelect}
                                        input={<Input/>}
                                        MenuProps={MenuProps}
                                    >
                                        {this.state.appliedCandidates.length > 0 ? this.state.appliedCandidates.map((email) => (
                                            <MenuItem key={email} value={email}>
                                                {email}
                                            </MenuItem>
                                        )) : ""}
                                    </Select>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="classes.button btn-cancel"
                                        onClick={this.handleSelectCandidates}
                                        startIcon={<SelectAllIcon/>}
                                        style={{marginTop: 10}}
                                    >
                                        Confirm Selection
                                    </Button>
                                </FormControl>
                            </div>
                            <div
                                className="form_body_right"
                                style={{
                                    paddingBottom: "2%",
                                    display: this.state.viewSelected ? "block" : "none"
                                }}
                            >
                                <h4>Selected Candidates</h4>
                                {this.state.viewSelected ?
                                    typeof (profiles) === "string" ? "" : profiles.map(profile => (
                                        <Link
                                            to={{
                                                pathname: "/profile",
                                                state: {
                                                    email: profile.email
                                                }
                                            }}
                                            textDecoration="none"
                                        >
                                            <Avatar src={profile.image} style={{float: "left", marginRight: "1%"}}
                                                    className={classes.small}/>
                                            <div style={{padding: "1.5%"}}>
                                                {" " + profile ? profile.name ? profile.name.firstName : "" : "" + " " + profile ? profile.name.lastName : ""}
                                            </div>
                                            <br/>
                                        </Link>
                                    ))
                                    : " "
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

PostTask.propTypes = {
    editedTask: PropTypes.func.isRequired,
    getTask: PropTypes.func.isRequired,
    selectCandidates: PropTypes.func.isRequired,
    getSelectedCandidateProfiles: PropTypes.func.isRequired,
    getSponsorProfile: PropTypes.func.isRequired,
};

PostTask = reduxForm({
    form: "postTaskForm",
})(PostTask);

PostTask = connect(
    (state) => ({
        edited: state.task.edited,
        task: state.task.task,
        selected: state.task.selected,
        sponsor: state.task.sponsor,
        profiles: state.task.profiles,
        applied: state.task.applied,
        deleted: state.task.deleted,
        completed: state.task.completed
    }),
    {
        editTask,
        getTask,
        selectCandidates,
        getSelectedCandidateProfiles,
        deleteTask,
        getSponsorProfile,
        apply,
        markAsComplete
    }
)(PostTask);

PostTask = (withStyles(useStyles)(PostTask))

export default PostTask;
