import React, { Component } from 'react'
import '../App.css'
import Notes from './Notes'
import Reminders from './Reminders'

export class NoteSection extends Component {
    render() {
        let section_name = this.props.sectionname;
        return (
            
            <div className={(this.props.open ? 'Notesection-shift' : 'Notesection')}>
                {(() => {
                    if (section_name==='notes') {
                        console.log('DKLAKDLADLKSDLKASLD===============.Section')
                        return <Notes />
                    }
                    else if (section_name==='reminders'){
                        console.log('REMINDERS')
                        return <Reminders />
                    }   
                })()}
            </div>
        )
    }
}

export default NoteSection
