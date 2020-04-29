import React from "react";
import {Link} from "react-router-dom";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Joi from "joi-browser";
import "react-widgets/dist/css/react-widgets.css";
import "../../css/postTask.css";
import PostTaskFormEventHandlers from "./PostTaskFormEventHandlers";
import {editTask, getTask, selectCandidates} from "../../actions/taskActions";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
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
import SelectAllIcon from '@material-ui/icons/SelectAll';
import EditIcon from '@material-ui/icons/Edit';
import NumberFormat from 'react-number-format';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Image from 'material-ui-image';
import {getEmailFromLocalStorage, getRoleFromLocalStorage} from "../Common/auth";
import {TaskStatus} from "../../utils/Constants";

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
    }
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
            selected: []
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
                    // if(res) {
                    const task = this.props.task
                    console.log("Task " + task)
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
                        selected: task.selectedCandidates
                    })
                    let viewSelected = task.postedBy === localStorage.getItem('email') ? true : false
                    if (task.selectedCandidates && !viewSelected) {
                        task.selectedCandidates.forEach(candidate => {
                            if (candidate === localStorage.getItem('email')) {
                                viewSelected = true;
                            }
                        });
                    }
                    this.setState({viewSelected: viewSelected})
                    // if(viewSelected) {
                    //     this.props.getSelectedCandidateProfiles(task._id).then(res => {
                    //         if(res) {
                    //             const profiles = props.profiles
                    //             this.setState({
                    //                 profiles: profiles
                    //             })
                    //         }
                    //     })
                    // }
                    // }
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
            .then(res => {
                if (this.props.selected) {
                    window.alert("Candidates Successfully Selected")
                    window.location.reload();
                } else {
                    window.alert("Candidates couldn't be selected...")
                }
            })
    }

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

    render() {
        const {classes} = this.props;
        let renderSelectedCandidates = []
        if (this.state.selectedCandidates && this.state.viewSelected) {
            this.state.selectedCandidates.map(candidate => (
                renderSelectedCandidates.push(
                    <Link
                        to={{
                            pathname: "/profile",
                            state: {
                                email: candidate
                            }
                        }}
                        style={{textDecoration: "none"}}
                    >
                        {candidate}
                    </Link>
                )
            ))
        } else if (this.state.viewSelected) {
            renderSelectedCandidates = "No Candidates Selected"
        }
        if (getRoleFromLocalStorage() != UserRoles.SPONSOR) {
            return (
                <React.Fragment>
                    <div className="main-post-task">
                        <p className="task-not-found">Access Denied</p>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="main-post-task">
                        <form className={classes.root}>
                            <div className="form_body_bottom">
                                <div style={{marginBottom: "2%"}}><b>
                                    Task Posted By:
                                    <Link
                                        to={{
                                            pathname: "/profile",
                                            state: {
                                                email: this.state.postedBy
                                            }
                                        }}
                                        style={{textDecoration: 'none'}}
                                    >
                                        {" " + this.state.postedBy}
                                    </Link>
                                </b></div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                    </div>
                                    <div className="custom-file">
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
                                    id="submitButton"
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
                                    disabled={this.state.postedBy !== localStorage.getItem("email")}
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    className="classes.button btn-cancel"
                                    onClick={this.state.editMode ? this.onCancel : this.onEditClick}
                                    startIcon={this.state.editMode ? <CloseIcon/> : <EditIcon/>}
                                >
                                    {this.state.editMode ? "Cancel" : "Edit Task"}
                                </Button>
                                <Tooltip title="Task cannot be deleted after candidates are selected">
                                    <Button
                                        disabled={this.state.status !== TaskStatus.CREATED &&
                                        this.state.postedBy !== localStorage.getItem("email")}
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        className="classes.button btn-cancel"
                                        onClick={this.toggle} // todo
                                        startIcon={<DeleteIcon/>}
                                    >
                                        Delete Task
                                    </Button>
                                </Tooltip>
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
                                            // onClick={this.onDelete} // todo
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
                                        && this.state.status === TaskStatus.CREATED ? "block" : "none"
                                    }}
                                >
                                    {/*To display this if task status is created + sponsor=postedby*/}
                                    <h4>Select Candidates for the task</h4>
                                    <FormControl className="classes.formControl input-field">
                                        <InputLabel id="demo-mutiple-name-label">Select</InputLabel>
                                        <Select
                                            disabled={!this.state.appliedCandidates}
                                            labelId="demo-mutiple-name-label"
                                            id="demo-mutiple-name"
                                            multiple
                                            value={this.state.selected}
                                            onChange={this.handleSelect}
                                            input={<Input/>}
                                            MenuProps={MenuProps}
                                        >
                                            {this.state.appliedCandidates ? this.state.appliedCandidates.map((email) => (
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
                                    {renderSelectedCandidates}
                                </div>
                            </div>
                        </form>
                    </div>
                </React.Fragment>
            )
        }
    }
}

PostTask.propTypes = {
    editedTask: PropTypes.func.isRequired,
    getTask: PropTypes.func.isRequired,
    selectCandidates: PropTypes.func.isRequired,
};

PostTask = reduxForm({
    form: "postTaskForm",
})(PostTask);

PostTask = connect(
    (state) => ({
        edited: state.task.edited,
        task: state.task.task,
        selected: state.task.selected
    }),
    {editTask, getTask, selectCandidates}
)(PostTask);

PostTask = (withStyles(useStyles)(PostTask))

export default PostTask;
