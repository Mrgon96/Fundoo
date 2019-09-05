import React, { Component } from 'react'
import ReminderIcon from '../Images/reminder.svg'
import Menu from '@material-ui/core/Menu'
import { MenuItem, TextField } from '@material-ui/core';
import ClockIcon from '../Images/clock.svg'
import LeftArrowIcon from '../Images/left_arrow.svg'
import { createMuiTheme, Divider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import NoteService from '../Services/NoteService'

const updateReminder = new NoteService().update_note

const theme = createMuiTheme({
    overrides: {
        MuiTextField:{
                root:{
                    marginLeft:15,
                    marginRight:15
                }  
        },
    },
})

export class NoteReminderMenu extends Component {
    constructor(){

        super();
        this.state = {
            anchorEl : null,
            menuopen : false,
            showReminder: "block",
            showPicker: "none",
            time:"12:00"

        }
        
        this.handleClick=this.handleClick.bind(this)
        this.handleMenuClose=this.handleMenuClose.bind(this)
        this.handlePicker = this.handlePicker.bind(this)
        this.handleReminder = this.handleReminder.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.handleReminderData = this.handleReminderData.bind(this)

    }

    

    handlePicker= event =>{
        this.setState({
            showPicker:"block",
            showReminder:"none"
        })
    }

    handleDate = event => {
        console.log("======> from Input", event.target.value)
    }
    handleReminder= event =>{
        this.setState({
            showPicker:"none",
            showReminder:"block"
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


    handleReminderData = event => {
        this.handleMenuClose();
        var today = new Date() 
        var date = today.getDate()
        today.setHours(20,0,0,0)
        var hours = today.getHours()
        var targetName = event.target.id
        try{
            if(targetName==="today"){
                console.log("TODAY SET",today)
        }
        else if(targetName==="tommorrow"){
            
            today.setDate(date+1)
            
            console.log("TOMOOROOW SET",today)
            console.log("Tommorrow DATE", today)
        }
        else if(targetName==="nextWeek"){
         
            today.setDate(date+7)
            console.log("NEXT WEEKDATE " ,today)
        }
        }catch(error){
            console.log("ERROR", error)
        }
        var updateReminderData={
            reminder: today.toJSON()
        }
        updateReminder(this.props.id, updateReminderData)
        .then(res=>{
            console.log("RESPONSE REMINDER", res.data)
            this.props.setReminder(today.toJSON());
            
        })
        .catch(error=>{
            console.log(error, error)
        })
        
    }
    render() {

        
        return (
            <div>
                <img 
                src={ReminderIcon}
                className="noteActionContent" 
                alt="hi"
                aria-controls="reminerMenu" 
                aria-haspopup="true" 
                onClick={this.handleClick} 
                />
                <Menu
                id="reminerMenu"
                className="reminderMenu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={this.state.menuopen}
                onClose={this.handleMenuClose}
                >


                    <div id="reminderMenuMain" style={{display:this.state.showReminder}}>
                    <div className="heading">Reminder:</div>


                    <MenuItem  className="dateData">
                    <p id="today" 
                    onClick={this.handleReminderData}>
                        Later today   :   8:00 PM
                    </p>
                    </MenuItem>

                    <MenuItem className="dateData" >
                        <p  
                        id="tommorrow"   
                        onClick={this.handleReminderData}>
                            Tommorrow   :   8:00 PM
                        </p>
                    </MenuItem>

                    <MenuItem 
                    className="dateData" 
                    >
                        <p 
                        id="nextWeek" 
                        onClick={this.handleReminderData}> 
                        Next Week   :   8:00 PM
                        </p>
                    </MenuItem>

                    <MenuItem className="dateData" onClick={this.handlePicker}>
                        <img src={ClockIcon} alt="clock" height="15" width="15"/>
                        &nbsp;&nbsp;
                        <p>Pick Date & Time:</p>
                    </MenuItem>

                    

                    </div>

                    <div id="reminderMenuDatePicker" style={{display:this.state.showPicker}}>

                    <div className="heading" style={{marginBottom:20, marginLeft:0, cursor:"pointer"}}>
                    <img 
                    onClick={this.handleReminder} 
                    height="25" width="25" 
                    src={LeftArrowIcon} 
                    alt="arrow"/>
                    </div>

                    <ThemeProvider theme={theme}> 
                    <div className="DatePicker" style={{display:"flex",flexDirection:"column"}}>
                    <TextField placeholder="add a date" type="date" name="date"  onChange={this.handleDate}/>
                    <TextField placeholder="add a date"  type="time" name="date"  onChange={this.handleDate}/>
                    <input type="datetime-local" id="meeting-time"
       name="meeting-time" ></input>
                    </div>
                    </ThemeProvider>
                    



                    {/* <MenuItem className="dateData" onClick={this.handleMenuClose}>
                        <img src={ClockIcon} alt="clock" height="15" width="15"/>
                        &nbsp;&nbsp;
                        <p>Pick Date & Time:</p>
                    </MenuItem> */}


                    <div className="footer" onClick={this.handleMenuClose}>save</div>

                    </div>
                   
                </Menu>
            </div>
        )
    }
}

export default NoteReminderMenu
