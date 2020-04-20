import React, { Component } from 'react';
import './SearchUsers.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { fetchAllUsersForInbox } from "../../../actions/inboxActions";
import { connect } from "react-redux";
import ConversationListItem from '../ConversationListItem';


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

class SearchUsers extends Component {

  
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            allUsers: [],
            visibleUsers: []
        }
    }

    setOpen = (val) => {
        this.setState({
            open: val,
            allUsers: this.props.inboxUsers.filter(u => 'name' in u),
            visibleUsers: this.props.inboxUsers.filter(u => 'name' in u)
        })
    }

    searchUsers = (str) => {
        console.log(str)
        if (str.trim() === "" || str === '*') {
          this.setState({
            visibleUsers: this.state.allUsers
          })
        } else {
          let filteredUsers = this.state.allUsers.filter(user => {
            if (user.name.toLowerCase().startsWith(str.toLowerCase())) return true;
            else return false;
          })
    
          this.setState({
            visibleUsers: filteredUsers
          })
        }
      }
    
    renderAllUsers = () => {
        return this.state.visibleUsers.map(user => {
            return <ConversationListItem
                key={user.name}
                data={user}
                onClick={() => alert(user.name)}
            />
        })
    }

    render() {
        const { icon } = this.props;
        const handleClickOpen = () => {
            this.props.fetchAllUsersForInbox(() => this.setOpen(true));
        };
      
        const handleClose = () => {
            this.setOpen(false);
        };
        return (
            <div>
                <i className={`toolbar-button ${icon}`} onClick={handleClickOpen} />
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Start a Conversation
                    </DialogTitle>
                    <DialogContent dividers>
                        <div className="conversation-search">
                            <input
                                type="search"
                                className="conversation-search-input"
                                placeholder="Search Users"
                                onKeyUp={(event) => this.searchUsers(event.target.value)}
                            />
                        </div>
                        <div className="conversation-list">
                            {this.renderAllUsers()}
                        
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        inboxUsers: state.inboxUsers
    };
  }
  
  export default connect(mapStateToProps, { fetchAllUsersForInbox })(withStyles(styles)(SearchUsers));