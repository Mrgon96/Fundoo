import React, { Component } from 'react'
import ArchiveIcon from '../Images/archive.svg'
import UnArchiveIcon from '../Images/unarchive.svg'
import NoteService from '../Services/NoteService'

const updateArchive = new NoteService().update_note

export class NoteArchiveEdit extends Component {
    constructor(props){
        super(props);
        this.state ={
            archive:props.is_archive,
        }
        this.handleArchive = this.handleArchive.bind(this)
        this.handleUnarchive = this.handleUnarchive.bind(this)
    }

    handleArchive = event =>{
        this.setState({
            archive:!this.state.archive
        })
        var archiveData={
            'is_archive':true
        }
        updateArchive(this.props.id, archiveData)
        .then(res=>{
            console.log(res)
            this.props.getAllNotes();
        })
        .catch(error=>{
            console.log(error.response)
        })

    }

    handleUnarchive = event =>{
        this.setState({
            archive:!this.state.archive
        })
        var archiveData={
            'is_archive':false
        }
        updateArchive(this.props.id, archiveData)
        .then(res=>{
            console.log(res)
            this.props.getAllNotes();
        })
        .catch(error=>{
            console.log(error.response)
        })

    }
    render() {
        var Icon=ArchiveIcon;
        var archiveIcon =<img src={Icon} className="noteActionContent" alt="hi" onClick={this.handleArchive} />
        if(this.state.archive){
            Icon=UnArchiveIcon;
            archiveIcon =<img src={Icon} className="noteActionContent" alt="hi" onClick={this.handleUnarchive} />
        }
        return (
            <div>
                {archiveIcon}
            </div>
        )
    }
}

export default NoteArchiveEdit
