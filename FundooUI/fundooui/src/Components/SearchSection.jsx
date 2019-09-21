import React, { Component } from 'react'
import '../App.css'
import Notes from './Notes'



export class SearchSection extends Component {
    constructor(props){
        super(props);
        this.state={
            searchValue:props.searchValue,
            searchNotes:[]
        }
       

    }

    componentDidMount(){
       this.handleSearchNotes()

    }

    handleSearchNotes = event => {
        this.setState({
                    searchNotes:this.props.searchedNotes
        })
    }
 
    render() {

    
        let listView = this.props.listView
        return (
            
            <div style={{background:"red"}} className={(this.props.open ? 'Notesection-shift' : 'Notesection')}>
                <h1>Hi GON KAISA HAI</h1>
                 <Notes usersList={this.props.usersList} data={this.state.searchNotes} labelsList={this.props.labelsList} listView={listView}
                                getAllNotes={this.getAllNotes}
                                />
            
            </div>
        )
    }
}

export default SearchSection
