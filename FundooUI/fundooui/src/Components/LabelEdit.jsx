import React, { Component } from 'react'
import '../App.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import LabelIcon from '../Images/label.svg';
import CheckIcon from '../Images/check.svg';

import LabelEditList from './LabelEditList'
import NoteService from '../Services/NoteService'
const Add_Label= new NoteService().add_Labels
const edit_Label = new NoteService().edit_Label


export class LabelEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            editLabel:false,
            labelId:null,
            labelsArr:[],
            labelsList:[],
            labelName:null,
            updateName:null
        }

        this.EditLabel = this.EditLabel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.AddLabel = this.AddLabel.bind(this)
        this.changeLabelName = this.changeLabelName.bind(this)
    }

    AddLabel = event =>{
        var labeldata ={
            'name':this.state.labelName,
            'user':sessionStorage.getItem('id')
        }
        Add_Label(labeldata)
        .then(res=>{
            console.log(res)
            this.props.renderLabelsList();
            this.setState({
                labelName:null,
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }
    componentDidMount(){
        this.props.renderLabelsList();
    }

    changeLabelName(labelname){
        this.setState({
            updateName:labelname
        })
    }

    onChangeValue = event =>{
        console.log("EVENT TAE+RGET ", event.target)
        this.setState({
            [event.target.name]:event.target.value
        })
        
    }


    EditLabel = (event)=>{
        var updateLabelData={
            'name': this.state.updateName
        }
        edit_Label(event.target.id, updateLabelData)
        .then(res=>{
            console.log(res)
            this.props.renderLabelsList();
            this.setState({
                updateName:null,
            })
        })
        .catch(error=>{
            console.log(error);
        })
     
    }

    handleChange = (e, id) =>{
        console.log("EVENT NAME", e.target)
    }
    render() {
        
        
        const labelListMap = this.props.labelsList.map((key=>{
            
            // }
    
            return (
            <LabelEditList
            changeLabelName={this.changeLabelName}
            updateName={this.state.updateName} 
            key={key.id} 
            data={key} 
            EditLabel={this.EditLabel} 
            handleChange={this.handleChange} />)
            })
            )
        return (
            <div>
                <Dialog open={this.props.openEdit}>
                    <h4 className="labelEditHeading">Edit Labels</h4>
                <DialogContent>
                <InputBase 
                name="labelName"
                style={{marginLeft:40, marginBottom:10, background:"lightgray"}}
                placeholder="create Label"
                onChange={this.onChangeValue}

                >
                    
                </InputBase>
                <img 
                // className="labelEditIcon"
                style={{marginTop:20, marginLeft:20}}
                // onChange={this.props.handleChange(this.props.data.id)}
                onClick={this.AddLabel}
                src={CheckIcon}
                heigh="20" width="20" 
                alt="Edit Labelname"></img>
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
