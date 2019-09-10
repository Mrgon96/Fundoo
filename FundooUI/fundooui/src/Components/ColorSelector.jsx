import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import ColorPalleteIcon from '../Images/colorPallete.svg'
import NoteService from '../Services/NoteService'

const updateColor = new NoteService().update_note

export class ColorSelector extends Component {
    constructor(){
        super();
        this.state = {
            anchorEl : null,
            menuopen : false,
            bgColors:[
                {"value": "#fff"},
                {"value": "#ccff90"},
                {"value": "#d7aefb"},
                {"value": "#f28b82"},
                {"value": "#fff475"},
                {"value": "#cbf0f8"},
                {"value": "#fdcfe8"},
                {"value": "#aecbfa"},
                {"value": "#e8eaed"},
                ],
            color: "#fff",
         
        }
        
        this.handleClick=this.handleClick.bind(this)
        this.handleMenuClose=this.handleMenuClose.bind(this)
        
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.target,
            menuopen:true
        })
        // console.log("Opnes")
        // console.log(event.target.value) 
        // console.log(this.state.menuopen) 
      }
      
    handleMenuWithClose = (event) => {
        this.setState({
            anchorEl:null,
            menuopen:false
        })
    }

    handleMenuClose = (event) => {
        this.setState({
            color: event.target.id
        })
        // console.log("noteCOLOR======> "+this.state.color)
        this.props.changeColor(event.target.id)

        var updateColorData = {
            "color":event.target.id 
        }
        if(this.props.id){
            updateColor(this.props.id, updateColorData)
        .then(res =>{
            // console.log("UPDATE COLOR DATA====",res.data)
        })
        .catch(error=>{
            // console.log("ERROR FOR COLOR =====", error.response.data)
        })
        }
        
      }


    render() {
        const Bgcolors = this.state.bgColors.map((bgColors)=>{
            const colorIs = bgColors.value
            
            return <Avatar
            key={bgColors.value}
                        id={colorIs}                
                        name={colorIs} 
                        style={{
                            margin:2,
                            background:colorIs, 
                            height:30, 
                            width:30,
                            borderColor:"#808080",
                            borderWidth:0.5,
                            borderStyle: "solid"   
                        }} 
                        onClick={this.handleMenuClose}>
                    </Avatar>
            // <div onClick={this.props.handleMenuClose}>
            //         <Avatar 
            //         style={{background:bgColors.value}}></Avatar>
            //     </div>
        })

        return (
            <div>
            <img src={ColorPalleteIcon} className="noteActionContent" alt="hi"
                    aria-controls="colorMenu" 
                    aria-haspopup="true" 
                    onClick={this.handleClick}
                    >
                    </img>
            <Menu 
            id="colorMenu"
            className="colorMenu"
            anchorEl={this.state.anchorEl}
            keepMounted 
            open={this.state.menuopen}
            onClose={this.handleMenuWithClose}
            >       

                <Grid style={{width:120}} container justify="space-between" alignItems="center">
                    {Bgcolors}
                    </Grid>               
            </Menu>
            </div>
            
        )
    }
}

export default ColorSelector
