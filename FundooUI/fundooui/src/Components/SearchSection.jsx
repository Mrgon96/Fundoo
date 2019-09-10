import React, { Component } from 'react'
import '../App.css'




export class SearchSection extends Component {
    constructor(props){
        super(props);
        this.state={
            searchValue:props.searchValue,
            searchNotes:[]
        }
       

    }

    componentDidMount(){
       

    }

    handleSearchNotes = event => {
        

    }
 
    render() {

    
        // let listView = this.props.listView
        return (
            
            // <div className={(this.props.open ? 'Notesection-shift' : 'Notesection')}>
            //      <Notes usersList={th/is.props.usersList} data={this.state.notes} labelsList={this.props.labelsList} listView={listView}
            //                     getAllNotes={this.getAllNotes}
            //                     />
            <div>
                <h1>Hello Mr.GON96</h1>
            </div>
        )
    }
}

export default SearchSection
