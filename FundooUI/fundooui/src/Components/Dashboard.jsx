import React, { Component } from 'react'
import MainAppBar from './MainAppBar'
import Drawer1 from './Drawer1'
import NoteSection from './NoteSection'
import NoteEdit from './NoteEdit'
import { Redirect } from 'react-router-dom'
import LabelNotesList from './LabelNotesList'
export class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            section:'notes',
            redirect: false,
            listView: false,
            labelname: '',
            
        }
        this.openDrawer = this.openDrawer.bind(this)
        this.openSection = this.openSection.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
        this.changeView = this.changeView.bind(this)
        this.openLabelSection = this.openLabelSection.bind(this)
    }
    

    changeView = event=>{
        this.setState({
            listView:!this.state.listView
        })
        console.log("VIEW CHANGED", this.state.listView)
        
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

    openLabelSection(label_name){
        console.log('IN OPEN SECTION '+label_name)
        this.setState({
            labelname:label_name,
            section:''
        }) 
    }
    openSection(sectionname){
        console.log('IN OPEN SECTION '+sectionname)
        this.setState({
            section:sectionname,
            labelname:''
        })
    }

    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        if(this.state.labelname === ''){
            return (
                <div>
                    <MainAppBar 
                openDrawer={this.openDrawer} 
                handleSignOut={this.handleSignOut}
                changeView={this.changeView}
                listView={this.state.listView}
                />
                <Drawer1 open={this.state.open} openSection={this.openSection} 
                openLabelSection={this.openLabelSection}
                />
                <NoteEdit open={this.state.open} />
                <NoteSection
                sectionname={this.state.section} 
                open={this.state.open}
                listView={this.state.listView}/>
                </div>
                
            )
        }
        else{
            return (
                <div>
                    <MainAppBar 
                openDrawer={this.openDrawer} 
                handleSignOut={this.handleSignOut}
                changeView={this.changeView}
                listView={this.state.listView}
                />
                <Drawer1 open={this.state.open} openSection={this.openSection} 
                openLabelSection={this.openLabelSection}
                />
                <NoteEdit open={this.state.open} />
                <LabelNotesList
                labelname={this.state.labelname} 
                open={this.state.open}
                listView={this.state.listView}/>
                </div>
                
            )
        }
        // return (
        //     <div>
                
                
               
        //     </div>  
        // )
    }
}

export default Dashboard
