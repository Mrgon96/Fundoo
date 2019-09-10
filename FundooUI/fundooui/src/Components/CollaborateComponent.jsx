import React, { Component } from 'react'
import '../App.css'
import CollaborateIcon from '../Images/collaborator.svg';
import addPeopleIcon from '../Images/add_people.svg'
import { Dialog, DialogTitle, DialogContent, Divider, Avatar, DialogActions, InputBase, Button } from '@material-ui/core';
import profileIcon from '../Images/profile.png';
import UserService from '../Services/UserService';
import NoteService from '../Services/NoteService';
const userService = new UserService().get_profile_pic
const addCollaborator = new NoteService().add_collaborator

export class CollaborateComponent extends Component {

    constructor(){
        super();
        this.state = {
            menuopen : false,
            owner:sessionStorage.getItem('email'),
            username:sessionStorage.getItem('username'),
            profile_pic:profileIcon,
            collaborators:[],
            emails:[],
            email:'',
            displayError:"none",
            errorMessage: ''
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

    onChangeEmail = event =>
    {   
        this.setState({
            email:event.target.value
        })
        this.setState({
            displayError:"none"
        })
        console.log("Email Value", this.state.email)
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
            email:'',
            menuopen:false,
            displayError:"none",
            errorMessage:'',
            
        })
        
      }


    handleSubmit = event =>{
        let id = this.props.id
        var collaborateData = {
            'email':this.state.email
        }
        addCollaborator(id, collaborateData)
        .then(res=>{
            console.log(res.data)
            this.props.updatedNoteRender();
            this.setState({
                displayError:"none",
                errorMessage:''
                
            })
        })
        .catch(error=>{
            this.setState({
                displayError:"block",
                errorMessage:error.response.data.message
            })
            console.log("ERRROROROR",error.response.data.message)
        })
    }
    render() {
        // console.log("USERS LIST", this.props.users)
        

        let user_emails = []
        // console.log("User_emails 1")
        this.props.collaborators.map((id)=>{
            this.props.users.map((user)=>{
                // console.log("User_emails 2")
                if(id===user.pk){
                    user_emails.push(user)
                }
                return user_emails
            })
            // console.log("User_emails 3")
            return user_emails
        })

        // console.log("User_emails 4")
        // console.log("USERS EMAILS ARE HERE", user_emails)

        const emailsCollaborated = user_emails.map((key)=>{
            return(<div key={key.pk} className="collaboratorDiv">
            <div className="collaborateAvatar">
            <Avatar src={profileIcon}>
            </Avatar>
            </div>
            <h4>{key.username}</h4>
           <p>{key.email}</p>
        </div>)
        })


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

                    {emailsCollaborated}

                    <div className="collaboratorDiv2">
                        <div className="collaborateAvatar">
                        <Avatar src={addPeopleIcon}>
                        </Avatar>
                        </div>
                        <InputBase
                        defaultValue=""
                         type="email"
                        onChange={this.onChangeEmail}
                         placeholder="Enter Email"
                         className="collaboratorInput">
                        </InputBase>
                        <Button onClick={this.handleSubmit} className="collaboratorButton" variant="contained" color="primary">
                            Add
                        </Button>
                        
                            <p style={{display:this.state.displayError, color:"red"}}>
                            {this.state.errorMessage}
                            </p>
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
