import React, { Component } from 'react'
import MainAppBar from './MainAppBar'
import Drawer1 from './Drawer1'
import NoteSection from './NoteSection'
import NoteEdit from './NoteEdit'

export class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            section:'notes'
        }
        this.openDrawer = this.openDrawer.bind(this)
        this.openSection = this.openSection.bind(this)
    }

    openDrawer = event =>{
        this.setState({
            open: !this.state.open
        })
        console.log(this.state)
    }

    openSection(sectionname){
        console.log('IN OPEN SECTION '+sectionname)
        this.setState({
            section:sectionname
        })
    }

    render() {
        return (
            <div>
                <MainAppBar openDrawer={this.openDrawer}/>
                <Drawer1 open={this.state.open} openSection={this.openSection}/>
                <NoteEdit open={this.state.open} />
                <NoteSection sectionname={this.state.section} open={this.state.open}/>
            </div>  
        )
    }
}

export default Dashboard
