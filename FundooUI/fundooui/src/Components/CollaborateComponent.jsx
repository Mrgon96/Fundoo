import React, { Component } from 'react'
import '../App.css'
import CollaborateIcon from '../Images/collaborator.svg';

import Menu from '@material-ui/core/Menu'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Dialog, DialogTitle, DialogContent, Divider, Avatar, DialogActions } from '@material-ui/core';
import profileIcon from '../Images/profile.png';
import UserService from '../Services/UserService';
const userService = new UserService().get_profile_pic

export class CollaborateComponent extends Component {

    constructor(){
        super();
        this.state = {
            menuopen : false,
            owner:sessionStorage.getItem('email'),
            username:sessionStorage.getItem('username'),
            profile_pic:profileIcon,
            collaborators:[],
            emails:[]
        }
        
        this.handleClick=this.handleClick.bind(this)
        this.handleMenuClose=this.handleMenuClose.bind(this)
        
    }

    componentDidMount(){
        this.getProfilePic();
        this.setState({
            collaborators:this.props.collaborators
        })
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
            menuopen:true
        })
        console.log("Opnes")
        console.log(event.target.value) 
        console.log(this.state.menuopen) 
      }
      

    handleMenuClose = (event) => {
        this.setState({

            menuopen:false
        })
      }
    render() {
        console.log("USERS LIST", this.props.users)
        let users = []
        users = this.props.users

        let user_emails = []
        users.map((user)=>{
            this.state.collaborators.map((id)=>{
                if(id===user.email){
                    user_emails.push(user)
                }
            })
        })
        console.log("USERS EMAILS ARE HERE", user_emails)
        return (
            <div>
                <img src={CollaborateIcon} 
                className="noteActionContent" alt="hi"
                onClick={this.handleClick}
                >
                 
                    </img>
            <Dialog 
            id="collaborateMenu"
            className="collaborateMenu"
            keepMounted 
            open={this.state.menuopen}
            // open = {true}
            onClose={this.handleMenuClose}
            >       

                <DialogTitle>
                    Collaborators
                    <Divider />
                </DialogTitle> 

                <DialogContent >
                    <div className="collaboratorDiv">
                        <div className="collaborateAvatar">
                        <Avatar src={this.state.profile_pic}>
                        </Avatar>
                        </div>
                        <h4>{this.state.username}</h4>
                       <p>{this.state.owner} (owner)</p>
                    </div>
                    <div className="collaboratorDiv">
                        <div className="collaborateAvatar">
                        <Avatar>
                        </Avatar>
                        </div>
                        <h4>GON VERSE</h4>
                       <p>gaurav23091#hadsbbdabhdj</p>
                    </div>
                    <div className="collaboratorDiv">
                        <div className="collaborateAvatar">
                        <Avatar>
                        </Avatar>
                        </div>
                        <h4>GON VERSE</h4>
                       <p>gaurav23091#hadsbbdabhdj</p>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div onClick={this.handleMenuClose}>cancel</div>
                </DialogActions>
            </Dialog>
            

            
            </div>
            
        )
    }
}

export default CollaborateComponent
