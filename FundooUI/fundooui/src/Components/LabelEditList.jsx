import React, { Component } from 'react'
import '../App.css'
import LabelIcon from '../Images/label.svg'
import PencilIcon from '../Images/label_edit.svg'
import ArchiveIcon from '../Images/archive_menu.svg'
import TrashIcon from '../Images/menu_trash.svg'
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import CheckIcon from '../Images/check.svg' 


export class LabelEditList extends Component {
    constructor(){
        super();
        this.state={
            buttonId:null,
            labelName: null
        }
        
        this.changeImage= this.changeImage.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        
    }

    onChangeValue = event =>{
        console.log("VENET NAMAE SCAHSNE" , event.target.id)
        const newlabelName = event.target.value
        this.props.changeLabelName(newlabelName)
    }

    changeImage = event => {
        this.setState({
            buttonId:event.target.id
        })
        
    }
    render() {
        const image=CheckIcon

        return (
            <div>
                <Grid container justify="flex-start" style={{width:300}}>
 
                
                <img src={LabelIcon} 
                alt="Label Icon" 
                style={{marginRight:10, 
                marginLeft:10}}
                ></img>



                <Grid style={{width:250}} 
                container justify="space-between" 
                alignItems="center"
                
                >


                <InputBase 
                id={this.props.data.id}
                name="labelName"
                defaultValue={this.props.data.name} 
                onChange={this.onChangeValue}
                >
                
                </InputBase>
                    
                
 
                <img 
                id={this.props.data.id}
                className="labelEditIcon"
                onClick={this.props.EditLabel}
                src={image}
                heigh="20" width="20" 
                alt="Edit Labelname"></img>

                
                </Grid>
                </Grid>
                            </div>
        )
    }
}

export default LabelEditList
