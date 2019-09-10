import React, { Component } from 'react'
import '../App.css'
import Notes from './Notes'
// import Reminders from './Reminders'
// import LabelNotesList from './LabelNotesList'
import NoteEdit from './NoteEdit'
import NoteService from '../Services/NoteService'

const get_notes = new NoteService().get_allNotes
const getReminders = new NoteService().get_reminders
// const get_labelsNotes = new NoteService().get_label_notes
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
            trash:[],
            usersList:[]
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
            // console.log("Data ===========================", this.state.notes)

        }).catch(error=>{
            console.log(error)
        })
    }

    

    getReminderNotes(){
        getReminders()
        .then(res =>{
            this.setState({reminders:res.data.data})
            // console.log("Data REMINDERS ===========================", this.state.reminders)

        }).catch(error=>{
            console.log(error)
        })
    }

    getArchiveNotes(){
        getArchives()
        .then(res =>{
            this.setState({archives:res.data.data})
            // console.log("Data ARCHIVES ===========================", this.state.reminders)

        }).catch(error=>{
            console.log(error)
        })
    }

    getTrashedNotes(){
        getTrash()
        .then(res =>{
            this.setState({trash:res.data.data})
            console.log("Data Trash ===========================", this.state.reminders)

        }).catch(error=>{
            console.log(error)
        })
    }

    render() {
        let section_name = this.props.sectionname;
    
        let listView = this.props.listView
        return (
            
            <div className={(this.props.open ? 'Notesection-shift' : 'Notesection')}>
                <center>
                <NoteEdit getAllNotes={this.getAllNotes}/>
                </center>
               

                {(() => {
                    switch(section_name){
                        case 'notes':
                                return <Notes usersList={this.props.usersList} data={this.state.notes} labelsList={this.props.labelsList} listView={listView}
                                getAllNotes={this.getAllNotes}
                                />
                        
                        case 'reminders':
                                return <Notes usersList={this.props.usersList} data={this.state.reminders} labelsList={this.props.labelsList} listView={listView}
                                // getAllNotes={this.getAllNotes}
                                />

                        default:
                                return <Notes usersList={this.props.usersList} data={this.state.notes} labelsList={this.props.labelsList} listView={listView}
                                getAllNotes={this.getAllNotes}
                                />

                    }
                    
                })()}
                
            </div>
        )
    }
}

export default NoteSection
