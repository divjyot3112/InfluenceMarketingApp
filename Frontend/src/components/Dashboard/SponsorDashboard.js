import React,{Component} from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import { fetchDashboardTasks } from "../../actions/dashboardActions";
import { TaskStatus } from '../../utils/Constants';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
      flexGrow: 1,
    }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
]

class SponsorDashboard extends Component {

    
    //get the courses data from backend  
    componentDidMount() {
        //TODO: get all tasks instead
        this.props.fetchDashboardTasks("john.doe@gmail.com", TaskStatus.CREATED);
    }
    
      
    renderTasks() {
        const { classes } = this.props;
        return _.map(this.props.dashboardTasks,(task) => (
            <Grid item key={task} xs={10} sm={6} md={3}> {/*md was 4*/}
                <Card onClick={() =>alert("Hey")} className={classes.card}>
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
                            Desc: {task.description}
                        </Typography>
                        <Typography>
                            Posted On: {new Date(task.postedOn).toLocaleDateString()}
                        </Typography>
                    </CardContent>
                    {/*
                    <CardActions>
                        <Button size="small" color="primary">
                            View
                        </Button>
                        <Button size="small" color="primary">
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
        dashboardTasks: state.dashboardTasks
    };
  }
  
  export default connect(mapStateToProps, { fetchDashboardTasks })(withStyles(useStyles)(SponsorDashboard));
  