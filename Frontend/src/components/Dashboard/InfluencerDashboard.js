import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import { fetchDashboardTasks, getCurrentPageTasks } from "../../actions/dashboardActions";
import { TaskStatus } from '../../utils/Constants';
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
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import NoData from './NoData'
import "../../css/dashboard.css";
import { MY_USER_ID } from "../../utils/Constants";

//create the Navbar Component

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

class InfluencerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPageTasks: [],
            numPages: 0,
            openSelect:false
        }
    }

    handleOpenSelect = () => {
        this.setState({
            openSelect: true
        })
    }
    
    handleCloseSelect = () => {
        this.setState({
            openSelect: false
        })
    }

    handleChangeSelect = (event) => {
        this.setState({
            influencer: event.target.value
        })
    }

    //get the courses data from backend  
    componentDidMount() {
        //TODO: get all tasks instead
        this.props.fetchDashboardTasks(MY_USER_ID, TaskStatus.ALL);
    }

    handlePaginationClick = (event, value) => {
        this.setState({
            currentPageTasks: this.props.getCurrentPageTasks(value, this.props.dashboardTasks)
        })
    }

    truncate = (input) => input.length > 30 ? `${input.substring(0, 30)}...` : input

    handleOnStatusChange = (event) => {
        console.log(event)
        this.props.fetchDashboardTasks(MY_USER_ID, event.target.value);
    }

    renderTasks() {
        const { classes } = this.props;
        if (this.props.currentPageTasks.length > 0) {
            return _.map(this.props.currentPageTasks, (task) => (
            
                <Grid item key={task} xs={10} sm={6} md={3}> {/*md was 4*/}
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h6" component="h2">
                                {task.title}
                            </Typography>
                            <Typography>
                                <div style={{ overflowWrap: "break-word" }}><b>Desc:</b> {this.truncate(task.description)}</div>
                            </Typography><br></br>
                            <Typography>
                                <b>Posted On:</b> {new Date(task.postedOn).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => { window.location.href = "/task/description/" + task._id }}>View</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))
        } else {
           return  <NoData image={window.location.origin + "/no_tasks.png"} description="No Matching Tasks Found"/>
            
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                
                <CssBaseline />
                <div className="filter">
                    <div style={{float:"left"}}>
                    <FormControl className={classes.formControl}>
                    <RadioGroup row aria-label="position" name="position" defaultValue="end" onChange={(event)=>this.handleOnStatusChange(event)}>
                        <FormControlLabel
                        value={TaskStatus.COMPLETED}
                        control={<Radio color="primary" />}
                        label={TaskStatus.COMPLETED}
                        labelPlacement="end"
                        />
                        <FormControlLabel
                        value={TaskStatus.INPROGRESS}
                        control={<Radio color="primary" />}
                        label={TaskStatus.INPROGRESS}
                        labelPlacement="end"
                        />
                                <FormControlLabel value={TaskStatus.PENDING} control={<Radio color="primary" />} label={TaskStatus.PENDING} />
                                <FormControlLabel
                        value={TaskStatus.ALL}
                        control={<Radio color="primary" />}
                        label={TaskStatus.ALL}
                        labelPlacement="end"
                        />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <div style={{ float: "right", display:"inline"}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Sort By</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={this.state.openSelect}
                        onClose={this.handleCloseSelect}
                        onOpen={this.handleOpenSelect}
                        value={this.state.influencer}
                        onChange={this.handleChangeSelect}
                        >
                        <MenuItem value={10}>Most Recent</MenuItem>
                        <MenuItem value={20}>Salary: Low to High</MenuItem>
                        <MenuItem value={30}>Salary: High to Low</MenuItem>
                        </Select>
                        </FormControl>
                        </div>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {this.renderTasks()}
                    </Grid>
                    <div className={classes.root}>
                         <Pagination count={this.props.numPages} variant="outlined" color="primary" onChange={this.handlePaginationClick} hidden={this.props.currentPageTasks.length<=0} />
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

InfluencerDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

//This method is provided by redux and it gives access to centeral store
function mapStateToProps(state) {
    return {
        dashboardTasks: state.dashboardTasks,
        numPages: state.dashboardNumPages,
        currentPageTasks: state.dashboardCurrentPageTasks
    };
}

export default connect(mapStateToProps, { fetchDashboardTasks, getCurrentPageTasks })(withStyles(useStyles)(InfluencerDashboard));
