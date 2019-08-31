import React, { Component } from 'react'
import '../App.css'
import Drawer from '@material-ui/core/Drawer';
import { createMuiTheme, Divider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import BulbIcon from '../Images/notes_grey.svg'
import ReminderIcon from '../Images/reminder_menu.svg'
import LabelIcon from '../Images/label.svg'
import PencilIcon from '../Images/label_edit.svg'
import ArchiveIcon from '../Images/archive_menu.svg'
import TrashIcon from '../Images/menu_trash.svg'
import LabelEdit from './LabelEdit'

// import NoteService from '../Services/NoteService'
// const getLabels = new NoteService().get_Labels

const theme = createMuiTheme({
    overrides: {
        MuiDrawer:{
            paper:{
                width:250,
                top:65,
            },
        },
    },
})

export class Drawer1 extends Component {

    constructor(){
        super();
        this.state = {
           section: 'notes',
           labels:[],

        }

        this.handleNotesSection=this.handleNotesSection.bind(this)
        this.handleReminderSection=this.handleReminderSection.bind(this)
        this.handleLabelSection = this.handleLabelSection.bind(this)
        this.handleArchivesSection = this.handleArchivesSection.bind(this)
        this.handleTrashSection=this.handleTrashSection.bind(this)
    }

    componentDidMount(){
        
        this.state.labels = this.props.labelsList
        

    }


    handleNotesSection = event =>{
        this.setState({
            section:'notes'
        })
        console.log(this.state)
        this.props.openSection('notes')
    }

    handleReminderSection = event =>{
        this.setState({
            section:'reminders'
        })
        console.log(this.state)
        this.props.openSection('reminders')
    }

    handleLabelSection = event =>{
        console.log(event.target.id, "LABEL EVENT")
        this.setState({
            section:event.target.id
        })
        console.log(this.state)
        console.log("SENDING LABEL ID", event.target.id)
        this.props.openLabelSection(event.target.id)
    }

    handleArchivesSection = event =>{
        this.setState({
            section:'archives'
        })
        console.log(this.state)
        this.props.openArTraSection('archives')
    }

    handleTrashSection = event =>{
        this.setState({
            section:'trash'
        })
        console.log(this.state)
        this.props.openArTraSection('trash')
    }

    render() {

        console.log(this.props.labelsList, "LABELSLIST")
        let labelListMap = this.props.labelsList.map((key)=>{
            return (<div id={key.name} name={key.name} className="drawer-list" onClick={this.handleLabelSection}>
                    
            <div className="drawer-icon">
            <img src={LabelIcon} alt="Labels"/>
            </div>
        
        <p> {key.name} </p>
        </div>

        )
        })

        const open = this.props.open
        console.log(open+"=============FROM DRAWER")
        return (
            <ThemeProvider theme={theme}> 
                <Drawer
                    transitionDuration={750}
                    className="drawer"
                    variant="persistent"
                    anchor="left"
                    open={this.props.open}           
                >   
                    
                    <div className="drawer-list" onClick={this.handleNotesSection}>
                        <div className="drawer-icon">
                            <img src={BulbIcon} alt="notes"/>
                        </div>
                    
                    <p> Notes </p>
                    </div>
                    <div className="drawer-list" onClick={this.handleReminderSection}>
                        <div className="drawer-icon">
                        <img src={ReminderIcon} alt="Notes"/>
                        </div>
                    
                    <p> Reminders </p>
                    </div>
                    <Divider />
                    <div className="label-heading">
                        LABELS 
                    </div>
                    
                    {labelListMap}
                    
                    
                    <div className="drawer-list" onClick={this.props.changeOpenEdit}>
                        <div className="drawer-icon">
                        <img src={PencilIcon} alt="Edit Labels"/>
                        </div>
                    
                    <p> Edit Labels </p>
                    </div>
                    <Divider />
                    <div className="drawer-list" onClick={this.handleArchivesSection}>
                        <div className="drawer-icon">
                        <img src={ArchiveIcon} alt="archive" />
                        </div>
                    
                    <p> Archives </p>
                    </div>

                    <div className="drawer-list" onClick={this.handleTrashSection}>
                        <div className="drawer-icon">
                        <img src={TrashIcon} alt="trash" />
                        </div>
                    
                    <p> Trash </p>
                    </div>
      
                   </Drawer>     
            </ThemeProvider>
            
        )
    }
}


export default Drawer1
