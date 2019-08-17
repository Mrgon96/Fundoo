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
        }

        this.handleNotesSection=this.handleNotesSection.bind(this)
        this.handleReminderSection=this.handleReminderSection.bind(this)
    }

    handleNotesSection = event =>{
        this.setState({
            section:'notes'
        })
        console.log(this.state)
        this.props.openSection(this.state.section)
    }

    handleReminderSection = event =>{
        this.setState({
            section:'reminders'
        })
        console.log(this.state)
        this.props.openSection(this.state.section)
    }

    render() {
        const open = this.props.open
        console.log(open+"=============FROM DRAWER")
        return (
            <ThemeProvider theme={theme}> 
                <Drawer
                    transitionDuration={1050}
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
                    <div className="drawer-list">
                    
                        <div className="drawer-icon">
                        <img src={LabelIcon} alt="Labels"/>
                        </div>
                    
                    <p> Labels </p>
                    </div>
                    
                    
                    <div className="drawer-list">
                        <div className="drawer-icon">
                        <img src={PencilIcon} alt="Edit Labels"/>
                        </div>
                    
                    <p> Edit Labels </p>
                    </div>
                    <Divider />
                    <div className="drawer-list">
                        <div className="drawer-icon">
                        <img src={ArchiveIcon} alt="archive" />
                        </div>
                    
                    <p> Archives </p>
                    </div>

                    <div className="drawer-list">
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
