import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import {TaskStatus} from '../../utils/Constants';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "../../css/search.css";
import {Link} from "react-router-dom";
import {searchTasks, sortTasks} from "../../actions/searchActions";
import NoData from "../Dashboard/NoData";
import Pagination from "../Common/pagination";
import {paginate} from "../Common/paginate";
import {Redirect} from "react-router";
import {getEmailFromLocalStorage} from "../Common/auth";

const useStyles = (theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(5),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    }
});

class SearchTasks extends Component {

    state = {
        currentPage: 1,
        pageSize: 12,
        searchString: "",
        status: ""
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleChangeSelect = (event) => {
        let sortBy = event.target.value;
        this.props.sortTasks(sortBy);
        this.forceUpdate();
    }

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({
                searchString: this.props.location.state.searchString,
                status: this.props.location.state.status
            });

            this.props.searchTasks({
                title: this.props.location.state.searchString,
                status: this.props.location.state.status
            })
        }
    }

    handleOnStatusChange = (event) => {
        let status = event.target.value

        const data = {
            title: this.state.searchString,
            status: status
        };

        this.setState({
            status: status,
            currentPage: 1,
        })

        this.props.searchTasks(data);
    }

    truncate = (input) => input.length > 30 ? `${input.substring(0, 30)}...` : input

    componentWillReceiveProps(props) {
        if (props.location.state.searchString !== this.state.searchString) {
            this.setState({searchString: props.location.state.searchString});

            props.searchTasks({
                title: props.location.state.searchString,
                status: props.location.state.status
            })
        }
    }

    renderTasks() {
        const {classes} = this.props;

        if (this.props.tasks && this.props.tasks.length > 0) {
            const paginatedData = paginate(
                this.props.tasks ? this.props.tasks : "",
                this.state.currentPage,
                this.state.pageSize
            );

            return _.map(paginatedData, (task) => {

                return (
                    <Grid item key={task} xs={10} sm={6} md={3}> {/*md was 4*/}
                        <Card className={classes.card}>

                            <CardMedia
                                className={classes.cardMedia}
                                image={(task.image === null || task.image === undefined) ? window.location.origin + '/NoImageFound.jpg' : task.image}
                                title={task.title}
                            />

                            <CardContent className={classes.cardContent}>
                                <CardActions>
                                    <Link
                                        to={{
                                            pathname: "/task",
                                            state: {
                                                taskId: task._id
                                            }
                                        }}
                                        style={{textDecoration: "none"}}
                                    >
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {task.title}
                                        </Typography>
                                    </Link>
                                </CardActions>

                                <Typography>
                                    <div style={{overflowWrap: "break-word"}}>
                                        <i>"{this.truncate(task.description)}"</i></div>
                                </Typography><br/>

                                <Typography>
                                    <b>Category:</b> {task.category}
                                </Typography><br/>

                                <Typography>
                                    <b>Salary:</b> ${task.salary}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })
        } else {
            return <NoData image={window.location.origin + "/no_tasks.png"} description="No Matching Tasks Found"/>

        }
    }

    render() {
        let redirectVar = null;
        if (!getEmailFromLocalStorage()) {
            redirectVar = <Redirect to="/"/>;
        }

        const {classes} = this.props
        return (
            <React.Fragment>
                {redirectVar}
                <CssBaseline/>
                <div className="filter">
                    <div style={{float: "left"}}>
                        <FormControl className={classes.formControl}>
                            <RadioGroup row aria-label="position" name="position" defaultValue="end"
                                        onChange={(event) => this.handleOnStatusChange(event)}>
                                <FormControlLabel
                                    value={TaskStatus.CREATED}
                                    control={<Radio color="primary"/>}
                                    label={TaskStatus.CREATED}
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value={TaskStatus.COMPLETED}
                                    control={<Radio color="primary"/>}
                                    label={TaskStatus.COMPLETED}
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value={TaskStatus.INPROGRESS}
                                    control={<Radio color="primary"/>}
                                    label={TaskStatus.INPROGRESS}
                                    labelPlacement="end"
                                />
                                <FormControlLabel value={TaskStatus.PENDING} control={<Radio color="primary"/>}
                                                  label={TaskStatus.PENDING}/>
                                <FormControlLabel
                                    value={TaskStatus.ALL}
                                    control={<Radio color="primary"/>}
                                    label={TaskStatus.ALL}
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div style={{float: "right", display: "inline"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Sort By</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                onChange={this.handleChangeSelect}
                            >
                                <MenuItem value={0}>Most Recent</MenuItem>
                                <MenuItem value={1}>Salary: Low to High</MenuItem>
                                <MenuItem value={2}>Salary: High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <br/>
                    <br/>
                    <br/>
                    <Grid container spacing={4}>
                        {this.renderTasks()}
                    </Grid>
                    <br/>
                    <br/>
                    <div className="general-pagination">
                        <Pagination
                            itemsCount={this.props.tasks ? this.props.tasks.length : ""}
                            pageSize={this.state.pageSize}
                            onPageChange={this.handlePageChange}
                            currentPage={this.state.currentPage}
                        />
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

SearchTasks.propTypes = {
    classes: PropTypes.object.isRequired,
    searchTasks: PropTypes.func.isRequired,
    sortTasks: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        tasks: state.searchItems.tasks,
    };
}

export default connect(mapStateToProps, {
    searchTasks, sortTasks
})(withStyles(useStyles)(SearchTasks));