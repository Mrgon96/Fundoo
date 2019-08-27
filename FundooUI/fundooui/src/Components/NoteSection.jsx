import React, { Component } from 'react'
import '../App.css'
import Notes from './Notes'
import Reminders from './Reminders'
import LabelNotesList from './LabelNotesList'
import NoteService from '../Services/NoteService'
const get_notes = new NoteService().get_allNotes
const getReminders = new NoteService().get_reminders
const get_labelsNotes = new NoteService().get_label_notes
const getArchives = new NoteService().get_archives
const getTrash = new NoteService().get_trash

export class NoteSection extends Component {
    constructor(){
        super();
        this.state={
            notes:[],
            reminders : [],
            labelNotesList:[],
            archives:[],
            trash:[]
        }
        this.getAllNotes = this.getAllNotes.bind(this)
        this.getReminderNotes = this.getReminderNotes.bind(this)
        // this.getLabelsNotes = this.getLabelsNotes.bind(this)
        this.getArchiveNotes = this.getArchiveNotes.bind(this)
        this.getTrashedNotes = this.getTrashedNotes.bind(this)    
    }

    componentDidMount(){
        this.getAllNotes()
        this.getReminderNotes()
    }
    

    getAllNotes(){
        get_notes()
        .then(res =>{
            this.setState({notes:res.data.data})
            console.log("Data ===========================", this.state.notes)

        }).catch(error=>{
            console.log(error)
        })
    }

    getReminderNotes(){
        getReminders()
        .then(res =>{
            this.setState({reminders:res.data.data})
            console.log("Data REMINDERS ===========================", this.state.reminders)

        }).catch(error=>{
            console.log(error)
        })
    }

    getArchiveNotes(){
        getArchives()
        .then(res =>{
            this.setState({archives:res.data.data})
            console.log("Data REMINDERS ===========================", this.state.reminders)

        }).catch(error=>{
            console.log(error)
        })
    }

    getTrashedNotes(){
        getTrash()
        .then(res =>{
            this.setState({trash:res.data.data})
            console.log("Data REMINDERS ===========================", this.state.reminders)

        }).catch(error=>{
            console.log(error)
        })
    }

    render() {
        let section_name = this.props.sectionname;
    
        let listView = this.props.listView
        return (
            
            <div className={(this.props.open ? 'Notesection-shift' : 'Notesection')}>
                {(() => {
                    if (section_name==='notes') {
                        console.log('DKLAKDLADLKSDLKASLD===============.Section')
                        return <Notes data={this.state.notes} listView={listView}/>
                    }
                    else if (section_name==='reminders'){
                        console.log('REMINDERS')
                        return <Notes data={this.state.reminders} listView={listView}/>
                    }
                    else if (section_name==='archives'){
                        console.log('ARCHIVES')
                        return <Notes data={this.state.archives} listView={listView}/>
                    }
                    else if (section_name==='trash'){
                        console.log('TRASH')
                        return <Notes data={this.state.trash} listView={listView}/>
                    }
                })()}
            </div>
        )
    }
}

export default NoteSection
