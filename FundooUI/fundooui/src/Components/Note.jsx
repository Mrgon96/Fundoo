import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import '../App.css'

import AddImageIcon from '../Images/addimage.svg'
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import ColorSelector from './ColorSelector';
import NoteArchiveEdit from './NoteArchiveEdit';
import NoteMoreMenu from './NoteMoreMenu'
import NoteReminderMenu from './NoteReminderMenu';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NoteService from '../Services/NoteService';
import CollaborateComponent from './CollaborateComponent'
import { Avatar } from '@material-ui/core'
const getNote=new NoteService().getOneNote;
const updateReminder = new NoteService().update_note
const updateContent = new NoteService().update_note

export class Note extends Component {
    constructor(props){
        super(props);
        this.state={
            openDialog:false,
            noteColor:"#fff",
            id:props.data.id,
            title:props.data.title,
            content:props.data.content,
            labels:[],
            reminder:props.data.reminder,
            is_archive:props.data.is_archive,
            is_trash:props.data.is_trash,
            listLabels:[],
            collaborators:[],
        }
        this.changeColor = this.changeColor.bind(this)
        this.handleNoteDialog = this.handleNoteDialog.bind(this)
        this.updatedNoteRender=this.updatedNoteRender.bind(this)
        this.deleteReminder = this.deleteReminder.bind(this)
        this.setReminder = this.setReminder.bind(this)
        this.updateNote = this.updateNote.bind(this)
        this.onChange = this.onChange.bind(this)

    }


    setReminder(reminderDate){
        this.setState({
            reminder:reminderDate
        })
    }

    deleteReminder = event =>{
        let id=this.state.id
        var reminderData = {
            'reminder' : null
        }
        updateReminder(id, reminderData)
        .then(res=>{
            this.setState({
                reminder:null
            })
            this.updatedNoteRender();
        })
        .catch(error=>{
            console.log("EERROORRORR", error)
        })
        
    }
    componentDidMount(){
        var noteData= this.props.data
        var Color=noteData.color
        this.setState({
            collaborators:noteData.collaborator,
            labels:noteData.labels,
            noteColor:Color,
            listLabels:this.props.labelsList
        })
    }

    updatedNoteRender = event => {
        let id = this.state.id
        getNote(id)
        .then(res=>{
            // console.log(res.data,"UPDATED NOTE  ")
            this.setState({
                title:res.data.title,
                content:res.data.content,
                collaborators:res.data.collaborator
                // reminder:res.data.reminder,
                // labels:res.data.labels
            })
        })
        .catch(error=>{
            console.log("ERRORROROR ",error)
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
            this.updatedNoteRender();
        })
        .catch(error=>{
            console.log("ERROR UPDATAE TIRLTE", error)
        })
    }

    handleNoteDialog = event => {
        // console.log("Note Dialog Value in Note", )
        this.setState({
            openDialog:!this.state.openDialog
        })
        this.updateNote();
        // console.log("Note Dialog Value in Note", this.state.openDialog)
    }

    changeColor(color){
        this.setState({
            noteColor:color
        })
    }

    render() {

        // console.log("IN A NOTE LABELLSI", this.props.labelsList)
        let displayCard="block"
        if(this.state.openDialog){
            displayCard="none"
        }

        
        let noteWidth = 230
        var listViewmargin = "20px"
        if(this.props.listView){
            listViewmargin="20px 20px 20px"
            noteWidth = 600
            console.log("NOTE WIDTH",this.props.listView, noteWidth)
        }



        var id = this.state.id
        var title=this.state.title
        var content=this.state.content
        // var labelsnames = this.props.labelsList.filter((key)=>{
            
        // })


        const labelIds = this.state.labels
        const labelsnames = this.props.labelsList
        const labelmap1 = []

        // Label Mapping with Label list from note Object
        labelIds.map((id)=>{
            labelsnames.map((obj)=>{
                if(obj.id===id){
                     labelmap1.push(obj)
                }
                return labelmap1
            })
            return labelmap1
        })

        var labelmap = labelmap1.map((key)=>{
            return <Chip key={key.id} label={key.name} style={{marginTop:20, height:25,}} />
        })
        var reminder=this.state.reminder


        // console.log("Reminders Are")
        if(reminder!=null){
                reminder = <Chip label={reminder} style={{marginTop:20, height:25,}} onDelete={this.deleteReminder}/>
        }
        
        
        let user_emails = []
        this.state.collaborators.map((id)=>{
            this.props.users.map((user)=>{

                if(id===user.pk){
                    user_emails.push(user)
                }
                return user_emails
            })
            return user_emails
        })

        const collaboratorMap = user_emails.map((user)=>{
            
            return <Tooltip title={user.email}>
                <Avatar style={{height:30, width:30, color:"black"}}>{user.username[0]}</Avatar>
                </Tooltip>
        })

        var well="3px 5px 10px #9E9E9E"
        var borderCard="0.4px solid gray"
        

        return (
            
            
            <div>
                <Card id={id} className="noteCard" 
                    style={{
                    background:this.state.noteColor, 
                    margin:listViewmargin,
                    boxShadow:well,
                    border:borderCard,
                    width:noteWidth,
                    display:displayCard, 
                    transitionDuration:1,
                    
                    }}
                    
                    >
                    <CardContent onClick={()=>{this.handleNoteDialog();}}>
                        <div className="noteTitle" >
                        {title}
                        </div>
                        <div className="noteContent">
                        {content}
                        </div>
                        <div>
                        {labelmap}
                        {reminder}
                        {collaboratorMap}
                        </div>
                        
                        
                    </CardContent>
                    
                    <CardActions>
                        
                    <div className="noteActions">
                    <Tooltip title="Reminder">
                    <NoteReminderMenu id={id} setReminder={this.setReminder} />
                    
                    </Tooltip>
                    <Tooltip title="Collaborator">
                    <CollaborateComponent 
                    users={this.props.users} 
                    id={this.state.id} 
                    collaborators={this.state.collaborators}
                    updatedNoteRender={this.updatedNoteRender}
                    />
                    </Tooltip>

                    <Tooltip title="Colors">
                    <ColorSelector id={id} changeColor={this.changeColor}/>
                    </Tooltip>

                    <Tooltip title="Add Imgae">
                    <img src={AddImageIcon} className="noteActionContent" alt="hi">
                    </img>
                    </Tooltip>

                    <Tooltip title="Archive">
                     <NoteArchiveEdit 
                     
                     
                    getAllNotes={this.props.getAllNotes} id={this.state.id} changeColor={this.changeColor} is_archive={this.state.is_archive}/>
                    </Tooltip>

                    <Tooltip title="More">
                    <NoteMoreMenu  labelmap1={labelmap1} labels={this.state.labels} id={this.state.id} getAllNotes={this.props.getAllNotes}/>
                    </Tooltip>
                    </div>
                </CardActions>
                </Card>



                <Dialog open={this.state.openDialog}
                PaperProps={{
                    style: {
                      backgroundColor: this.state.noteColor,
                      transitionDuration:1
                    },
                  }} 
                  onClose={()=>{this.setState({openDialog:false})}}>

                    <DialogTitle >
                    <InputBase 
                    id="title"
                    defaultValue={title} 
                    style={{width:"95%"}} 
                    className="noteEditInput" 
                    multiline={true}  
                    placeholder="Title"
                    onChange={this.onChange}
                    ></InputBase> 
                    </DialogTitle>

                    
                    
                    <DialogContent>
                    <InputBase
                    id="content"
                    defaultValue={content} 
                    style={{width:"95%"}} 
                    className="noteEditInput" 
                    multiline={true}  
                    placeholder="Content"   
                    onChange={this.onChange}
                    >
                    </InputBase>


                    {labelmap}
                    {reminder}
                    {collaboratorMap}
                    </DialogContent> 
                        
                        
                        

                        
                    <DialogActions>

                    <div className="noteActions" style={{marginLeft:10}}>
                    <Tooltip title="Reminder">
                    <NoteReminderMenu id={id} setReminder={this.setReminder} />
                    
                    </Tooltip>
                    <Tooltip title="Collaborator">
                    <CollaborateComponent users={this.props.users} id={this.state.id} collaborators={this.state.collaborators}/>
                    </Tooltip>

                    <Tooltip title="Colors">
                    <ColorSelector id={id} changeColor={this.changeColor}/>
                    </Tooltip>

                    <Tooltip title="Add Imgae">
                    <img src={AddImageIcon} className="noteActionContent" alt="hi">
                    </img>
                    </Tooltip>

                    <Tooltip title="Archive">
                    <NoteArchiveEdit 
                     
                     
                     getAllNotes={this.props.getAllNotes} id={this.state.id} changeColor={this.changeColor} is_archive={this.state.is_archive}/>
                     </Tooltip>

                    <Tooltip title="More">
                    <NoteMoreMenu labelmap1={labelmap1} labels={this.state.labels} id={this.state.id} getAllNotes={this.props.getAllNotes}/>
                    </Tooltip>
                    </div>

                    <div className="noteEditClose" style={{marginLeft:300}}>
                        <p style={{cursor:"pointer"}} onClick={this.handleNoteDialog}>close</p>
                    </div>
                </DialogActions>
                    
              
            </Dialog>
                
            </div>
            
        )
    }
}

export default Note
