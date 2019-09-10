import React, { Component } from 'react'
import '../App.css'
import Note from './Note'
import Grid from '@material-ui/core/Grid';

export class Notes extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
        }
    }

    componentDidMount(){
        this.setState({
            data:this.props.data,
        })
    }

    // componentDidUpdate(){
    //     this.setState({
    //         data:this.props.data
    //     })
    // }

    render() {
        let listView = this.props.listView

        let gridAdjust = "space-around"
        if(listView){
            gridAdjust ="flex-start"
        }
        
        const notes = this.props.data.map((key)=>{
            // console.log(key, "FOR ONE NOTE")
            return <Note users={this.props.usersList} key={key.id} getAllNotes={this.props.getAllNotes} data={key} listView={listView} labelsList={this.props.labelsList}/>
        })

        return (
            <div className="NoteGrid" style={{borderColor:"black", borderStyle:"solid", borderWidth:1}}>
                <Grid 
                    container justify={gridAdjust}
                    alignItems="center">
                    {notes}
                </Grid> 
            </div>
        )
    }
}

export default Notes
