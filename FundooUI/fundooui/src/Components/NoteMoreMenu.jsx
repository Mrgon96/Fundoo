import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import { MenuItem } from '@material-ui/core';
import MoreIcon from '../Images/more.svg';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '../Images/check.svg';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import NoteService from '../Services/NoteService'
const trashNote = new NoteService().update_note
const getLabels = new NoteService().get_Labels
export class NoteMoreMenu extends Component {
    constructor(){
        super();
        this.state = {
            anchorEl : null,
            menuopen : false,
            labels:[],
            labelsList:[], 
           
        }
        
        this.handleClick=this.handleClick.bind(this)
        this.handleMenuClose=this.handleMenuClose.bind(this)
        this.handleTrash = this.handleTrash.bind(this)
        this.renderLabelsList = this.renderLabelsList.bind(this)
        
    }

    componentDidMount(){
        this.setState({
            labels:this.props.labels
        })
        this.renderLabelsList();
        // console.log("This Labels List is:", this.props.labelsList)
    }

    renderLabelsList = event =>{
        getLabels()
        .then(res=>{
            this.setState({
                labelsList:res.data,
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }

   
    handleClick = event => {
        this.setState({
            anchorEl: event.target,
            menuopen:true
        })
        console.log("Opnes")
        console.log(event.target.value) 
        console.log(this.state.menuopen) 
      }
      

    handleMenuClose = (event) => {
        this.setState({
            anchorEl:null,
            menuopen:false
        })
      }


    handleTrash = (event) =>{
        var dataToUpdate ={
            'is_trash':true
        }
        console.log("ID is", this.props.id )
        trashNote(this.props.id, dataToUpdate)
        .then(res=>{
            this.handleMenuClose();
            this.props.getAllNotes();
        })
        .catch(error=>{
            console.log("ERROR UPDATAE TIRLTE", error)
        })

    }
    render() {
        // console.log("LABEL LIST IS HERE =====", this.props.labelsList , "L:abels" , this.state.labels)
        // const labelsAre = this.props.labelsList;
        // const labels = this.state.labels.map((key)=>{
        //     return <checkbox key={key.id} id={key.id}  label={key.name}></checkbox>
        // })
        // console.log("LABELS LIST", this.props.labelsList)



        console.log("LABELS OF NOTE", this.props.labels, this.props.id)
        
        const map = this.state.labelsList.map((key)=>{
                    
                 return (
                        <div>
                             <FormControlLabel
                        control={
                        <Checkbox   />
                        }   
                        label={key.name}
                         />
                        </div>
                       
                    )
                // }
                // else{
                //     return (
                //         <div>
                //              <FormControlLabel
                //         control={
                //         <Checkbox   />
                //         }   
                //         label={key.name}
                //          />
                //         </div>
                       
                //     )
                // }
            })
            // })

        return (
            
            <div>
                <img 
                src={MoreIcon} 
                className="noteActionContent" 
                alt="hi"
                aria-controls="moreMenu" 
                aria-haspopup="true" 
                onClick={this.handleClick} 
                />
                <Menu

                id="moreMenu"
                className="moreMenu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={this.state.menuopen}
                onClose={this.handleMenuClose}
                >   
                    <div style={{display:"none"}}>
                    <MenuItem onClick={this.handleTrash}>Delete Note</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>Add Label</MenuItem>
                    </div>
                    
                    <div style={{display:"block"}}>
                    
                    <FormControl component="fieldset" >
        
        <div>
        <InputBase 
                name="labelName"
                style={{background:"lightgray", width:"50%",marginLeft:10}}
                placeholder="create Label"
                onChange={this.onChangeValue}

                >
                    
                </InputBase>
                <Button variant="outlined" color="default">
                <img 
                src={CheckIcon}
                heigh="20" width="20" 
                alt="Edit Labelname"></img>
                </Button>
               
        </div>
        <FormGroup style={{marginLeft:10}}>
          {map}
        </FormGroup>
      </FormControl>         
            
        

                    </div>
                </Menu>
            </div>
        )
    }
}

export default NoteMoreMenu
