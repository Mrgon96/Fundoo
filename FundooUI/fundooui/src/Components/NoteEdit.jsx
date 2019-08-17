import React, { Component } from 'react'
import '../App.css'

export class NoteEdit extends Component {
    render() {
        return (
            <div className={(this.props.open ? 'note-edit-shift' : 'note-edit')}>
                <h1>this is note edit</h1>
            </div>
        )
    }
}

export default NoteEdit
