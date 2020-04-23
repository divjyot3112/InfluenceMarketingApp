import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchUnratedInfluencers, addRating } from "../../actions/dashboardActions";
import {MY_USER_ID} from "../../utils/Constants"
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
      }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class AddRatingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSelect: false,
            value: 0,
            influencer: "",
            unratedInfluencers: []
        }
    }

    setOpen = (val) => {
        if (val === true) {
            this.props.fetchUnratedInfluencers(this.props.taskData._id, () => {
                this.setState({ unratedInfluencers: this.props.unratedInfluencers, open:val })
            })
        } else {
            this.setState({
                open: val
            })
        }
        
    }

    setValue = (val) => {
        this.setState({
            value:val
        })
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
            influencer:event.target.value
        })
    }

    renderInfluencers = () => {
        return this.state.unratedInfluencers.map(candidate => {
            return <MenuItem value={candidate.email}>{candidate.name}</MenuItem>
        })
    }

    addRating = () => {
        let data = {
            sponsor: MY_USER_ID,
            rating: this.state.value,
            task: this.props.taskData._id,
            comment: document.getElementById("comment").value
        }
        this.props.addRating(data, this.state.influencer)
        let unratedInfluencers = this.state.unratedInfluencers.filter(c => c.email !== this.state.influencer)
        console.log(unratedInfluencers)
        this.setState({
            unratedInfluencers: unratedInfluencers,
            influencer: ""
        })
    }

    rateAndContinue = () => {
        this.addRating();
    }

    rateAndClose = () => {
        this.addRating();
        this.setOpen(false);
    }
    render() {
        //const [open, setOpen] = useState(false);
        const handleClickOpen = () => {
            this.setOpen(true);
        };
        const handleClose = () => {
            this.setOpen(false);
        };
        const { classes } = this.props;
        return (
            <div>
                <Button size="small" color="primary" onClick={handleClickOpen}>
                            Rate
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {this.props.taskData.title}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-controlled-open-select-label">Influencer</InputLabel>
                                <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={this.state.openSelect}
                                onClose={this.handleCloseSelect}
                                onOpen={this.handleOpenSelect}
                                value={this.state.influencer}
                                onChange={this.handleChangeSelect}
                                >
                                {this.renderInfluencers()}
                                </Select>
                            </FormControl>
                        </Typography>
                        <Typography gutterBottom>
                            <FormControl className={classes.formControl}>
                                <Typography component="legend"></Typography>
                                <Rating
                                name="simple-controlled"
                                value={this.state.value}
                                onChange={(event, newValue) => {
                                    this.setValue(newValue);
                                }}
                                />
                                </FormControl>
                        </Typography>
                        <Typography gutterBottom>
                                <FormControl className={classes.formControl}>
                                <textarea style={{overflow:"hidden"}} rows={3} placeholder="Feedback" id ="comment"/>
                                </FormControl>
                         </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.rateAndContinue} color="primary">
                            Rate and Continue
                        </Button>
                        <Button autoFocus onClick={this.rateAndClose} color="primary">
                            Rate and Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        unratedInfluencers: state.unratedInfluencers
    };
}

export default connect(mapStateToProps, { fetchUnratedInfluencers, addRating })(withStyles(styles)(AddRatingModal));
