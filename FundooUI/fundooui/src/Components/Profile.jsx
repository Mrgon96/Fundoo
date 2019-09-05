import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export class Profile extends Component {
    render() {
        // console.log(this.props.openDialog)
        return (
            <Dialog open={this.props.openDialog}>
                <DialogTitle>Profile Pic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change Your Profile Pic Here
          </DialogContentText>
          <TextField type="file" variant="standard"></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.openDialogBox} color="primary">
            Cancel
          </Button>
          
        </DialogActions>
            </Dialog>
        )
    }
}

export default Profile
