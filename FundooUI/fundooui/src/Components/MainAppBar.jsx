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
import '../App.css'
import { MenuItem } from '@material-ui/core';
import UserService from '../Services/UserService'
const userService = new UserService().get_profile_pic

export class MainAppBar extends Component {

    constructor(){
        super();
        this.state = {
            anchorEl : null,
            menuopen : false,
            profile_pic: ''
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleMenuClose=this.handleMenuClose.bind(this)
        this.getProfilePic=this.getProfilePic.bind(this)
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
                    <Typography  gutterBottom>
                        <div className="title">
                        fundooNotes
                        </div>     
                    </Typography>
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
                    </Menu>
                
            </div>
        )
    }
}

export default MainAppBar
