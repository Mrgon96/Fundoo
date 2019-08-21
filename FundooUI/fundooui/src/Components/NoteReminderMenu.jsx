import React, { Component } from 'react'
import ReminderIcon from '../Images/reminder.svg'
import Menu from '@material-ui/core/Menu'
import { MenuItem } from '@material-ui/core';

export class NoteReminderMenu extends Component {
    constructor(){
        super();
        this.state = {
            anchorEl : null,
            menuopen : false,
        }
        
        this.handleClick=this.handleClick.bind(this)
        this.handleMenuClose=this.handleMenuClose.bind(this)
        
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
    render() {
        
        return (
            <div>
                <img 
                src={ReminderIcon}
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
                onClose={this.state.handleMenuClose}
                >
                    <MenuItem onClick={this.handleMenuClose}>Delete Node</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>Add Label</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default NoteReminderMenu
