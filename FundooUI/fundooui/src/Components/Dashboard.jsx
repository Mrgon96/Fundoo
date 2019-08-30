import React, { Component } from 'react'
import MainAppBar from './MainAppBar'
import Drawer1 from './Drawer1'
import NoteSection from './NoteSection'
import NoteEdit from './NoteEdit'
import { Redirect } from 'react-router-dom'
import LabelNotesList from './LabelNotesList'
import LabelEdit from './LabelEdit'
import NoteService from '../Services/NoteService'
const getLabels = new NoteService().get_Labels


export class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            section:'notes',
            redirect: false,
            listView: false,
            labelname: '',
            labelsList:[],
            openEdit:false
            
        }
        this.openDrawer = this.openDrawer.bind(this)
        this.openSection = this.openSection.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
        this.changeView = this.changeView.bind(this)
        this.openLabelSection = this.openLabelSection.bind(this)
        this.renderLabelsList = this.renderLabelsList.bind(this)
        this.changeOpenEdit = this.changeOpenEdit.bind(this)
    }
    

    changeView = event=>{
        this.setState({
            listView:!this.state.listView
        })
        console.log("VIEW CHANGED", this.state.listView)
        
    }

    componentDidMount(){
        this.renderLabelsList();
    }
    renderLabelsList = event =>{
        getLabels()
        .then(res=>{
            this.setState({
                labelsList:res.data,
                openEdit:false
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }

    changeOpenEdit = e =>{
        this.setState({
            openEdit:!this.state.openEdit
        })
        console.log("OPEN EDIT CHANGED", this.state.openEdit)
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
                <Drawer1
                changeOpenEdit={this.changeOpenEdit}
                 labelsList={this.state.labelsList}
                 open={this.state.open} openSection={this.openSection} 
                openLabelSection={this.openLabelSection}
                />
                
                <NoteSection
                labelsList={this.state.labelsList}
                sectionname={this.state.section} 
                open={this.state.open}
                listView={this.state.listView}/>

                <LabelEdit 
                 changeOpenEdit={this.changeOpenEdit}
                labelsList={this.state.labelsList} openEdit={this.state.openEdit}/>
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
                <Drawer1
                changeOpenEdit={this.changeOpenEdit}
                labelsList={this.state.labelsList} 
                open={this.state.open} openSection={this.openSection} 
                openLabelSection={this.openLabelSection}
                />
                
                <LabelNotesList
                labelsList={this.state.labelsList}
                labelname={this.state.labelname} 
                open={this.state.open}
                listView={this.state.listView}/>

                <LabelEdit 
                 changeOpenEdit={this.changeOpenEdit}
                labelsList={this.state.labelsList} openEdit={this.state.openEdit}/>
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
