import React, { Component } from 'react'
import '../App.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LabelIcon from '../Images/label.svg'
import PencilIcon from '../Images/label_edit.svg'
import ArchiveIcon from '../Images/archive_menu.svg'
import TrashIcon from '../Images/menu_trash.svg'
import Grid from '@material-ui/core/Grid';

export class LabelEdit extends Component {
    render() {

        const labelListMap = this.props.labelsList.map((key=>{
            return (<Grid container justify="flex-start" style={{width:300}}>
                       <img src={LabelIcon} alt="Label Icon" style={{marginRight:10, marginLeft:10}}></img>
                   <Grid style={{width:250}} container justify="space-between" alignItems="center">
                    <h5 style={{}}>{key.name}</h5>
                    <img src={PencilIcon} heigh="20" width="20" alt="Edit Labelname"></img>
                    </Grid>
                   </Grid>)
            })
            )
        return (
            <div>
                <Dialog open={true}>
                    <h4 className="labelEditHeading">Edit Labels</h4>
                <DialogContent>
                {labelListMap}
                   
                   </DialogContent>
                   <DialogActions>
                       DONE
                   </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default LabelEdit
