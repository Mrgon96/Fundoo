import React, { Component } from 'react'

import NoteService from '../Services/NoteService'
const getLabels = new NoteService().get_Labels

export class LabelMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.renderLabelsList = this.renderLabelsList.bind(this)
    }

    componentDidMount(){
        this.renderLabelsList();
    }
    renderLabelsList = event =>{
        getLabels()
        .then(res=>{
            this.setState({
                labelsList:res.data,
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render() {
        
       
        return (
            <div>
                
        

            </div>
        )
    }
}

export default LabelMenu
