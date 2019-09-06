import React, { Component } from 'react'
import '../App.css'
import Notes from './Notes'
import Reminders from './Reminders'
import LabelNotesList from './LabelNotesList'
import NoteEdit from './NoteEdit'
import NoteService from '../Services/NoteService'
const get_notes = new NoteService().get_allNotes
const getReminders = new NoteService().get_reminders
const get_labelsNotes = new NoteService().get_label_notes
const getArchives = new NoteService().get_archives
const getTrash = new NoteService().get_trash

export class ArchiveTrashSection extends Component {
    constructor(){
        super();
        this.state={
            notes:[],
            reminders : [],
            labelNotesList:[],
            archives:[],
            trash:[],
        }
        // this.getAllNotes = this.getAllNotes.bind(this)
        // this.getReminderNotes = this.getReminderNotes.bind(this)
        // this.getLabelsNotes = this.getLabelsNotes.bind(this)
        this.getArchiveNotes = this.getArchiveNotes.bind(this)
        this.getTrashedNotes = this.getTrashedNotes.bind(this)    
    }

    componentDidMount(){
        this.getArchiveNotes()
        this.getTrashedNotes()
    }
    


    getArchiveNotes(){
        getArchives()
        .then(res =>{
            this.setState({archives:res.data.data})
            console.log("Data ARCHIVES ===========================", this.state.reminders)

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
        let section_name = this.props.at;
    
        let listView = this.props.listView
        return (
            
            <div className={(this.props.open ? 'Notesection-shift' : 'Notesection')} style={{marginTop:150}}>
                <center>
                
                </center>
               

                {(() => {
                    switch(section_name){
                        case 'archives':
                        console.log('ARCHIVES')
                        return <Notes usersList={this.props.usersList} data={this.state.archives} labelsList={this.props.labelsList} listView={listView}
                        // getAllNotes={this.getAllNotes}
                        />

                        case 'trash':   
                        console.log('TRASH')
                        return <Notes usersList={this.props.usersList} data={this.state.trash} labelsList={this.props.labelsList} listView={listView}
                        getAllNotes={this.getAllNotes}/>

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

export default ArchiveTrashSection


