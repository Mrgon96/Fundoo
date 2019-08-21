import React, { Component } from 'react'
import MainAppBar from './MainAppBar'
import Drawer1 from './Drawer1'
import NoteSection from './NoteSection'
import NoteEdit from './NoteEdit'
import { Redirect } from 'react-router-dom'

export class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            section:'notes',
            redirect: false
        }
        this.openDrawer = this.openDrawer.bind(this)
        this.openSection = this.openSection.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
    }
    
    handleSignOut = event =>{
        sessionStorage.removeItem("userdata")
        localStorage.removeItem("token")
        localStorage.removeItem("profile_pic")
        this.setState({
            redirect:true
        })        
    }
    componentWillMount(){
        if(sessionStorage.getItem("userdata")){
            console.log(sessionStorage.getItem("userdata").token,"userdata")
        }
        else{
            this.setState({
                redirect:true
            })
        }
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

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }
        return (
            <div>
                <MainAppBar openDrawer={this.openDrawer} handleSignOut={this.handleSignOut}/>
                <Drawer1 open={this.state.open} openSection={this.openSection}/>
                <NoteEdit open={this.state.open} />
                <NoteSection sectionname={this.state.section} open={this.state.open}/>
            </div>  
        )
    }
}

export default Dashboard
