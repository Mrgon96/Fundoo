import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import '../App.css'
import CollaborateIcon from '../Images/collaborator.svg'
import AddImageIcon from '../Images/addimage.svg'
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import ColorSelector from './ColorSelector';
import NoteArchiveEdit from './NoteArchiveEdit';
import NoteMoreMenu from './NoteMoreMenu'
import NoteReminderMenu from './NoteReminderMenu';

export class Note extends Component {
    constructor(){
        super();
        this.state={
            noteColor:"#fff"
        }
        this.changeColor = this.changeColor.bind(this)
    }

    changeColor(color){
        this.setState({
            noteColor:color
        })
    }

    render() {

        return (
            <div>
                <Card className="noteCard" style={{background:this.state.noteColor}}>
                    <CardContent>
                        <div className="noteTitle">
                        Mrgon96adslhkldhaklsjdhksajhdkajshdkjsahdkj
                        </div>
                        <div className="noteContent">
                        Mr gon is very very very very goood. he is a kind gentleman. he loves to play fifa.
                        </div>
                        <Chip label="Basic" style={{marginTop:20, height:25,}} onDelete={AddImageIcon}/>
                        
                    </CardContent>
                    <CardActions>
                    <div className="noteActions">
                    <Tooltip title="Reminder">
                    <NoteReminderMenu />
                    
                    </Tooltip>
                    <Tooltip title="Collaborator">
                    <img src={CollaborateIcon} className="noteActionContent" alt="hi">
                    </img>
                    </Tooltip>

                    <Tooltip title="Colors">
                    <ColorSelector changeColor={this.changeColor}/>
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
                </CardActions>
                </Card>
                
                
                
            
            </div>
            
        )
    }
}

export default Note
