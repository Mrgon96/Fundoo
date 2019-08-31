import React, { Component } from 'react'
import '../App.css'
import LabelIcon from '../Images/label.svg'
import PencilIcon from '../Images/label_edit.svg'
import ArchiveIcon from '../Images/archive_menu.svg'
import TrashIcon from '../Images/menu_trash.svg'
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

export class LabelEditList extends Component {
    render() {
        return (
            <div>
                <Grid container justify="flex-start" style={{width:300}}>
 
                
                <img src={LabelIcon} 
                alt="Label Icon" 
                style={{marginRight:10, 
                marginLeft:10}}></img>
                <Grid style={{width:250}} 
                container justify="space-between" 
                alignItems="center">


                <InputBase 
                defaultValue={this.props.data.name} 
                onClick={this.EditLabel}>

                </InputBase>

                <img id={this.props.data.id}
                className="labelEditIcon"
                onChange={this.props.handleChange(this.props.data.id)}
                onClick={this.props.EditLabel} 
                src={PencilIcon} heigh="20" width="20" 
                alt="Edit Labelname"></img>
                </Grid>
                </Grid>
                            </div>
        )
    }
}

export default LabelEditList
