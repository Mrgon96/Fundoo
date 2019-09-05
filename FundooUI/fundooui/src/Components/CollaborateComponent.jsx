import React, { Component } from 'react'
import '../App.css'
import CollaborateIcon from '../Images/collaborator.svg';

import Menu from '@material-ui/core/Menu'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Dialog, DialogTitle, DialogContent, Divider, Avatar } from '@material-ui/core';

export class CollaborateComponent extends Component {

    constructor(){
        super();
        this.state = {
            menuopen : false,
         
        }
        
        this.handleClick=this.handleClick.bind(this)
        this.handleMenuClose=this.handleMenuClose.bind(this)
        
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
        
        return (
            <div>
                <img src={CollaborateIcon} 
                className="noteActionContent" alt="hi"
                onClick={this.handleClick}
                >
                 
                    </img>
            <Dialog 
            id="collaborateMenu"
            className="colorMenu"
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
                    <div className="collaboratorDiv">
                        <div className="collaborateAvatar">
                        <Avatar>
                        </Avatar>
                        </div>
                        <h4>GON VERSE</h4>
                       <p>gaurav23091#hadsbbdabhdj</p>
                    </div>
                </DialogContent>
            </Dialog>
            

            
            </div>
            
        )
    }
}

export default CollaborateComponent
