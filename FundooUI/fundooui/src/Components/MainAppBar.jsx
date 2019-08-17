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

import '../App.css'

export class MainAppBar extends Component {
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
                    
                    alt="This is Profile Pic"
                    src=""
                    className="avatar"
                    >

                    </Avatar>
                </ToolBar>
                </AppBar>

            </div>
        )
    }
}

export default MainAppBar
