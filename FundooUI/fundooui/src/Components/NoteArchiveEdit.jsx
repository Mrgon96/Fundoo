import React, { Component } from 'react'
import ArchiveIcon from '../Images/archive.svg'
import UnArchiveIcon from '../Images/unarchive.svg'

export class NoteArchiveEdit extends Component {
    constructor(){
        super();
        this.state ={
            archive:false,
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange = event =>{
        this.setState({
            archive:!this.state.archive
        })
    }
    render() {
        var Icon=UnArchiveIcon;;
        if(this.state.archive){
            Icon=ArchiveIcon;
        }
        return (
            <div>
                <img src={Icon} className="noteActionContent" alt="hi" onClick={this.onChange} />
            </div>
        )
    }
}

export default NoteArchiveEdit
