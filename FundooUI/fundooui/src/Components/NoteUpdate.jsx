import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import '../App.css'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, Divider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import CollaborateIcon from '../Images/collaborator.svg'
import AddImageIcon from '../Images/addimage.svg'
import Tooltip from '@material-ui/core/Tooltip';
import ColorSelector from './ColorSelector';
import NoteArchiveEdit from './NoteArchiveEdit';
import NoteMoreMenu from './NoteMoreMenu';
import Chip from '@material-ui/core/Chip';
import NoteReminderMenu from './NoteReminderMenu';
import NoteService from '../Services/NoteService'
const updateContent = new NoteService().update_note


export class NoteUpdate extends Component {
    constructor(props){
        super(props);
        this.state={
            title:props.data.title,
            content:props.data.content,
            noteColor:props.data.noteColor,
            noteReminder: props.data.reminder,
            noteLabels: props.data.labels

        }
        this.onChange = this.onChange.bind(this)
        this.updateNote = this.updateNote.bind(this)
        this.changeColor = this.changeColor.bind(this)
    }

    componentDidMount(){
        this.setState({
            noteReminder: this.props.data.reminder,
        })
    }
    
    changeReminder(data){
        this.setState({
            noteReminder:data
        })
    }

    changeColor(color){
        this.setState({
            noteColor:color
        })
    }

    onChange = event =>{
        this.setState({
            [event.target.id]:event.target.value
        })
    }

    updateNote = event =>{
        let id= this.props.data.id
        var dataToUpdate ={
            'title':this.state.title,
            'content':this.state.content,
        }
        updateContent(id, dataToUpdate)
        .then(res=>{
            this.props.updatedNoteRender();
            this.props.handleNoteDialog();
        })
        .catch(error=>{
            console.log("ERROR UPDATAE TIRLTE", error)
        })
        
    }
    render() {



        const data = this.props.data

        var labelmap = data.labels.map((key)=>{
            return <Chip label={key.name} style={{marginTop:20, height:25,}} onDelete={AddImageIcon}/>
        })
        var reminder=this.state.noteReminder
        console.log("Reminders Are")
        if(reminder!=null){
                reminder = <Chip label={reminder} style={{marginTop:20, height:25,}} onDelete={AddImageIcon} />
        }

        let dialogColor = this.props.data.noteColor
        console.log("dialog COLOR IS===========", dialogColor)

        return (
            <div >
                <Dialog open={this.props.openDialog}
                PaperProps={{
                    style: {
                      backgroundColor: dialogColor,
                    },
                  }} >

                    <DialogTitle >
                    <InputBase 
                    id="title"
                    defaultValue={data.title} 
                    style={{width:"95%"}} 
                    className="noteEditInput" 
                    multiline={true}  
                    className="noteEditInput" 
                    placeholder="Title"
                    onChange={this.onChange}
                    ></InputBase> 
                    </DialogTitle>

                    
                    
                    <DialogContent>
                    <InputBase
                    id="content"
                    defaultValue={data.content} 
                    style={{width:"95%"}} 
                    className="noteEditInput" 
                    multiline={true}  
                    className="noteEditInput" 
                    placeholder="Content"   
                    onChange={this.onChange}
                    >
                    </InputBase>


                    {labelmap}
                    {reminder}
                    </DialogContent> 
                        
                        
                        

                        
                    <DialogActions>

                    <div className="noteActions" style={{marginLeft:10}}>
                    <Tooltip title="Reminder">
                    <NoteReminderMenu id={data.id} changeReminder={this.changeReminder} setReminder={this.props.setReminder} updateNote={this.updateNote}/>
                    
                    </Tooltip>
                    <Tooltip title="Collaborator">
                    <img src={CollaborateIcon} className="noteActionContent" alt="hi">
                    </img>
                    </Tooltip>

                    <Tooltip title="Colors">
                    <ColorSelector id={data.id} changeColor={this.changeColor}/>
                    </Tooltip>

                    <Tooltip title="Add Imgae">
                    <img src={AddImageIcon} className="noteActionContent" alt="hi">
                    </img>
                    </Tooltip>

                    <Tooltip title="Archive">
                     <NoteArchiveEdit />
                    </Tooltip>

                    <Tooltip title="More">
                    <NoteMoreMenu />
                    </Tooltip>
                    </div>

                    <div className="noteEditClose" style={{marginLeft:300}}>
                        <p style={{cursor:"pointer"}} onClick={this.updateNote}>close</p>
                    </div>
                </DialogActions>
                    
              
            </Dialog>
            </div>
        )
    }
}

export default NoteUpdate
