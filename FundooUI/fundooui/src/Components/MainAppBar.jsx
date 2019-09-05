import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
// import AccountCircle from '@material-ui/icons/AccountCircle'
// import Button from '@material-ui/core/Button'
import keepIcon from '../Images/keep.png'
// import Drawer1 from './Drawer1'
import Menu from '@material-ui/core/Menu'
import profileIcon from '../Images/profile.png'
import listIcon from '../Images/list.svg'
import gridIcon from '../Images/grid.png'
import '../App.css'
import { MenuItem } from '@material-ui/core';
import Profile from './Profile'
import Redirect from 'react-router-dom'
import UserService from '../Services/UserService'
const userService = new UserService().get_profile_pic

export class MainAppBar extends Component {

    constructor(){
        super();
        this.state = {
            listView:false,
            anchorEl : null,
            menuopen : false,
            profile_pic: '',
            openDialog: false
        }

        this.handleClick=this.handleClick.bind(this)
        this.handleMenuClose=this.handleMenuClose.bind(this)
        this.getProfilePic=this.getProfilePic.bind(this)
        this.openDialogBox = this.openDialogBox.bind(this)

    }

    
    openDialogBox = event =>{
        this.setState({
            openDialog: !this.state.openDialog
        })

    }
    componentDidMount(){
        this.getProfilePic()
    }

    getProfilePic(){
        userService()
        .then(res =>{
            this.setState({profile_pic:res.data.profile_pic})


        }).catch(error=>{
            this.setState({
                profile_pic:profileIcon
            })
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
    
    handleMenuClose() {
        this.setState({
            anchorEl:null,
            menuopen:false
        })
      }

    render() {
        var Icon=listIcon;
        if(this.props.listView){
            Icon=gridIcon;
        }            
        return (
            <div className="root">
                <AppBar
                position="fixed"
                color="default"
                >
                <ToolBar className="toolbar">
                    <IconButton onClick={this.props.openDrawer} edge="start" color="inherit" aria-label="menu" className="menu-icon">
                        <MenuIcon />
                    </IconButton>
                    <div className="title-body">
                    <img src={keepIcon} alt="hi"></img>
                    
                        <div className="title">
                        <Typography  gutterBottom>
                        fundooNotes
                        </Typography>
                        </div>     
                    
                    </div>
                    
                    <div className="search">
                        <div className="search-icon">
                            <SearchIcon />
                        </div>
                        <InputBase
                        className="search-input"
                        placeholder="Search....">
                        </InputBase>
                        
                    </div>
                    
                    {/* GRID VIEW ICON============== */}
                    <img src={Icon} 
                     height="25"
                      width="25" 
                      alt="GridView" 
                      style={{margin:15,  cursor:"pointer"}}
                      onClick={this.props.changeView}/>
                    
                    <Avatar
                    aria-controls="profileMenu" 
                    aria-haspopup="true" 
                    onClick={this.handleClick}
                    alt="This is Profile Pic"
                    src={this.state.profile_pic}
                    className="avatar"
                    /> 
                    
                </ToolBar>
                
                </AppBar>
                <Menu 
                    id="profileMenu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.menuopen}
                    onClose={this.handleMenuClose}
                    >
                        <MenuItem onClick={this.props.handleSignOut}>Sign Out</MenuItem>
                        <MenuItem onClick={this.openDialogBox}>Change Profile Pic</MenuItem>
                    </Menu>
                    <Profile openDialog={this.state.openDialog} openDialogBox={this.openDialogBox}/>
            </div>
        )
    }
}

export default MainAppBar
