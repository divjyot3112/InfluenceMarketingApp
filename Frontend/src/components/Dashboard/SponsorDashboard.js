import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import { fetchDashboardTasks, getCurrentPageTasks } from "../../actions/dashboardActions";
import { TaskStatus } from '../../utils/Constants';

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
import AddRatingModal from './AddRatingModal'
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
    }
});

/*const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const tasks = [{
    title: "Task1",
    description: "This is task1",
    postedOn: "12/3/2020"
},
{
    title: "Task2",
    description: "This is task2",
    postedOn: "12/3/2020"
}
]*/

class SponsorDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPageTasks: [],
            numPages: 0
        }
    }

    //get the courses data from backend  
    componentDidMount() {
        //TODO: get all tasks instead
        this.props.fetchDashboardTasks("john.doe@gmail.com", TaskStatus.CREATED);
    }

    handlePaginationClick = (event, value) => {
        this.setState({
            currentPageTasks: this.props.getCurrentPageTasks(value, this.props.dashboardTasks)
        })
    }

    truncate = (input) => input.length > 40 ? `${input.substring(0, 40)}...` : input

    renderTasks() {
        const { classes } = this.props;
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
                            <div style={{overflowWrap:"break-word"}}><b>Desc:</b> {this.truncate(task.description)}</div>
                        </Typography><br></br>
                        <Typography>
                            <b>Posted On:</b> {new Date(task.postedOn).toLocaleDateString()}
                        </Typography>
                    </CardContent>
                
                    <CardActions>
                        <AddRatingModal taskData = {task}></AddRatingModal>
                        <Button size="small" color="primary" onClick={() => alert(task._id)}>View</Button>
                    </CardActions>
                     {/*   <Button size="small" color="primary">
                            Edit
                        </Button>
                    </CardActions>
                    */}
                </Card>
            </Grid>
        ))
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {this.renderTasks()}
                    </Grid>
                    <div className={classes.root}>
                        <Pagination count={this.props.numPages} variant="outlined" color="primary" onChange={this.handlePaginationClick} />
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

SponsorDashboard.propTypes = {
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

export default connect(mapStateToProps, { fetchDashboardTasks, getCurrentPageTasks })(withStyles(useStyles)(SponsorDashboard));
