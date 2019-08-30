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
import Button from '@material-ui/core/Button';
import CheckIcon from '../Images/check.svg'  
import InputBase from '@material-ui/core/InputBase';

export class LabelEdit extends Component {
    constructor(){
        super();
        this.state = {
            editLabel:false,
            labelId:null,
        }
    }

    EditLabel = (e)=>{
        this.setState({
            editLabel:!this.state.editLabel,
            // labelId:e.target.id
        })
    }
    render() {
        
        let EditIcon = PencilIcon
        if(this.state.editLabel){
            EditIcon = CheckIcon
        }

        const labelListMap = this.props.labelsList.map((key=>{
           
            return (<Grid container justify="flex-start" style={{width:300}}>
                       <img src={LabelIcon} 
                       alt="Label Icon" 
                       style={{marginRight:10, 
                       marginLeft:10}}></img>
                   <Grid style={{width:250}} 
                   container justify="space-between" 
                   alignItems="center">
                    <InputBase 
                    defaultValue={key.name} 
                    onClick={this.EditLabel}>

                    </InputBase>
                    <img id={key.id}
                     onClick={()=>this.EditLabel()} 
                     src={EditIcon} heigh="20" width="20" 
                     alt="Edit Labelname"></img>
                    </Grid>
                   </Grid>)
            })
            )
        return (
            <div>
                <Dialog open={this.props.openEdit}>
                    <h4 className="labelEditHeading">Edit Labels</h4>
                <DialogContent>
                {labelListMap}
                   
                   </DialogContent>
                   <DialogActions>
                       <Button variant="outlined" onClick={this.props.changeOpenEdit}>
                           Done
                       </Button>
                   </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default LabelEdit
