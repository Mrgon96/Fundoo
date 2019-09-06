import React, { Component } from 'react'
import '../App.css'
import Notes from './Notes'
import NoteEdit from './NoteEdit'
import NoteService from '../Services/NoteService'
const get_labelsNotes = new NoteService().get_label_notes

export class LabelNotesList extends Component {
    constructor(){
        super();
        this.state={
            labelNotesList:[]
        }
        this.getLabelsNotes = this.getLabelsNotes.bind(this)
    }

    componentDidMount(){
        this.getLabelsNotes()
    }
    
    getLabelsNotes(){
        get_labelsNotes(this.props.labelname)
        .then(res=>{
            console.log(res)
            this.setState({
                labelNotesList:res.data.data
            })
        })
        .catch(error=>{
            console.log("ERROR", error)
        })
    }

    render() {
        let section_name = this.props.labelname;
        console.log("LABEL SECTIONS I HERE", section_name)
        let listView = this.props.listView
        return (
            
            <div className={(this.props.open ? 'Notesection-shift' : 'Notesection')}>
                <NoteEdit  />
                <Notes usersList={this.props.usersList} data={this.state.labelNotesList} listView={listView} labelsList={this.props.labelsList}/>
                
            </div>
        )
    }
}

export default LabelNotesList
