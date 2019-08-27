import React, { Component } from 'react'
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
import NoteMoreMenu from './NoteMoreMenu'
import NoteReminderMenu from './NoteReminderMenu';
import NoteService from '../Services/NoteService'
const createNote = new NoteService().create_note
const theme = createMuiTheme({
    overrides: {
        MuiCardContent:{
            root:{
                padding:5,
            },
        },
    },
})

export class NoteEdit extends Component {

    constructor(){
        super();
        this.state={
            open:false,
            noteTitleEdit:"block",
            noteEdit:"none",
            noteColor:"#fff",
            labels:[],
            title:'',
            content:'',
            image: null,
            url: null,
            reminder: null,
            is_trashed: false,
            is_archived: false,
            is_pinned: false,
            color: "#fff",
            collaborator: []
        }
        this.changeColor = this.changeColor.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleEditClose = this.handleEditClose.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmitCreateNote = this.onSubmitCreateNote.bind(this)
    }

    changeColor(Note_color){
        this.setState({
            noteColor:Note_color,
            color:Note_color
        })
    }

    handleClick = event => {
        
        this.setState({
            noteTitleEdit:"none",
            noteEdit:"block",
        })
    }
    
    onChange = event =>{
        this.setState({
            [event.target.id]:event.target.value
        })
    }

    onSubmitCreateNote = event =>{
        let id = sessionStorage.getItem("id")
        let state = this.state
        var data = 
        {
            labels:state.labels,
            title:state.title,
            content:state.content,
            image: state.image,
            url: state.url,
            reminder: state.reminder,
            is_trashed: state.is_trashed,
            is_archived: state.is_archived,
            is_pinned: state.is_pinned,
            color: state.color,
            user: id,
            collaborator: state.collaborator,
        }
        createNote(data)
        .then(res=>{
            console.log("RESPONSE AFTER NOTE CREATED", res.data)
            
        })
        .catch(error=>{
            console.log("ERROR AFTER NOTE CREATED", error.data)
        })
    }

    handleEditClose = event => {
        this.onSubmitCreateNote();
        this.setState({
            noteTitleEdit:"block",
            noteEdit:"none",
            noteColor:"#fff",
            color:"#fff",
            title:'',
            content:''
        })
    }

    render() {
        return (
            <div className={(this.props.open ? 'note-edit-shift' : 'note-edit')}>

                <ThemeProvider theme={theme} >
                <Card style={{width:600,height:"auto", marginLeft:300,borderWidth:0.5, borderStyle:"solid", borderColor:"gray", background:this.state.noteColor}}>
                    <div className="showEdit" style={{display:this.state.noteTitleEdit,height:50}}>

                        <CardContent>
                        <InputBase  style={{height:0.56, marginBottom:20}} onClick={this.handleClick} className="noteEditInput" placeholder="Take a Note....">
                            </InputBase>


                        </CardContent>
                    </div>



                    <div className="Edit" style={{display:this.state.noteEdit}}>
                        <CardContent>
                        
                        <InputBase 
                        id="title" 
                        onChange={this.onChange} 
                        style={{width:"95%"}} 
                        className="noteEditInput" 
                        multiline={true} 
                        className="noteEditInput" 
                        placeholder="Title">
                        </InputBase> 

                        <InputBase id="content" 
                        onChange={this.onChange}
                        style={{width:"95%"}} 
                        className="noteEditInput" 
                        multiline={true} 
                        className="noteEditInput" 
                        placeholder="Content">   
                        </InputBase>


                        </CardContent>
                        <CardActions>

                    <div className="noteActions" style={{marginLeft:10}}>
                    <Tooltip title="Reminder">
                    <NoteReminderMenu />
                    
                    </Tooltip>
                    <Tooltip title="Collaborator">
                    <img src={CollaborateIcon} className="noteActionContent" alt="hi">
                    </img>
                    </Tooltip>

                    <Tooltip title="Colors">
                    <ColorSelector  changeColor={this.changeColor}/>
                    </Tooltip>

                    <Tooltip title="Add Imgae">
                    <img src={AddImageIcon} className="noteActionContent" alt="hi">
                    </img>
                    </Tooltip>

                    <Tooltip title="Archive">
                    <NoteArchiveEdit changeColor={this.changeColor}/>
                    </Tooltip>

                    <Tooltip title="More">
                    <NoteMoreMenu />
                    </Tooltip>
                    </div>

                    <div className="noteEditClose" style={{marginLeft:300}}>
                        <p style={{cursor:"pointer"}} onClick={this.handleEditClose}>close</p>
                    </div>
                </CardActions>
                    </div>
                </Card>
                </ThemeProvider>
                
                
            </div>
        )
    }
}

export default NoteEdit
