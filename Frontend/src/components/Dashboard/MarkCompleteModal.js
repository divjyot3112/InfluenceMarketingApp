import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


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
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} style={{outline:"none"}}>
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

class MarkCompleteModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    setOpen = (val) => {
        this.setState({
            open: val
        })
    }

    handleYesClick = () => {
        this.props.markComplete();
    }

    handleClickOpen = () => {
        this.setOpen(true);
    };

    handleClose = () => {
        this.setOpen(false);
    };

    renderDialogContent = () => {
        return <>
            <DialogContent dividers><p style={{ margin: "5%" }}>Are you sure you want to mark this task as Complete?</p></DialogContent>
            <DialogActions>
                <Button autoFocus onClick={this.handleYesClick} color="primary" style={{outline:"none"}}>
                    Yes
                </Button>
                <Button autoFocus onClick={this.handleClose} color="primary" style={{outline:"none"}}>
                    No
                </Button>
            </DialogActions>
        </>
    }
    render() {
        //const [open, setOpen] = useState(false);
        
        return (
            <div>
                <Tooltip title="Mark Task Complete">
                <IconButton aria-label="complete" onClick={this.handleClickOpen} style={{outline:"none"}}>
                <CheckCircleIcon size="small" color="primary">
                </CheckCircleIcon>
                </IconButton>
                </Tooltip> 
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        {this.props.taskData.title}
                    </DialogTitle>
                    {this.renderDialogContent()}
                </Dialog >
                   
            </div>
        )
    }
}
export default withStyles(styles)(MarkCompleteModal);
