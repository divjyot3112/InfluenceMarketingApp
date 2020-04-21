import React, { Component, useState } from 'react';
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
            influencer:""
        }
    }

    setOpen = (val) => {
        this.setState({
            open: val
        })
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
            influencer: event.target.value
        })
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
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Tenmdkjdkdjkdd</MenuItem>
                                <MenuItem value={20}>Twentydkjdkjd</MenuItem>
                                <MenuItem value={30}>Thirtydkkdjkdj</MenuItem>
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
                                <textarea style={{overflow:"hidden"}} rows={3} placeholder="Feedback" />
                                </FormControl>
                         </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Rate
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(AddRatingModal);
