import React, { Component } from 'react'
import MainAppBar from './MainAppBar'
import Drawer1 from './Drawer1'
import NoteSection from './NoteSection'
import NoteEdit from './NoteEdit'
import { Redirect } from 'react-router-dom'
import LabelNotesList from './LabelNotesList'
import LabelEdit from './LabelEdit'
import NoteService from '../Services/NoteService'
import ArchiveTrashSection from './ArchiveTrashSection';
import UserService from '../Services/UserService'
const getLabels = new NoteService().get_Labels
const getUsers = new UserService().get_all_users


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
            openEdit:false,
            at:'',
            usersList:[]
            
        }
        this.openDrawer = this.openDrawer.bind(this)
        this.openSection = this.openSection.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
        this.changeView = this.changeView.bind(this)
        this.openLabelSection = this.openLabelSection.bind(this)
        this.renderLabelsList = this.renderLabelsList.bind(this)
        this.changeOpenEdit = this.changeOpenEdit.bind(this)
        this.openArTraSection =this.openArTraSection.bind(this)
        this.getAllUser = this.getAllUser.bind(this)    
    }
    
    getAllUser(){
        getUsers()
        .then(res =>{
            this.setState({usersList:res.data.users})
            // console.log("Data ===========================", this.state.notes)

        }).catch(error=>{
            console.log(error)
        })
    }

    changeView = event=>{
        this.setState({
            listView:!this.state.listView
        })        
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
        this.renderLabelsList();
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
    componentDidMount(){
        if(sessionStorage.getItem("userdata")){

        }
        else{
            this.setState({
                redirect:true
            })
        }
        this.renderLabelsList()
        this.getAllUser()
    }

    openDrawer = event =>{
        this.setState({
            open: !this.state.open
        })

    }

    openLabelSection(label_name){
        console.log('IN OPEN SECTION '+label_name)
        this.setState({
            labelname:label_name,
            section:'',
            at:''
        }) 
    }
    openSection(sectionname){
        console.log('IN OPEN SECTION '+sectionname)
        this.setState({
            section:sectionname,
            labelname:'',
            at:''
        })
    }

    openArTraSection(sectionname){
        this.setState({
            section:'',
            labelname:'',
            at:sectionname
        })
    }

    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        if(this.state.labelname === '' && this.state.at===''){
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
                openArTraSection={this.openArTraSection}
                />
                
                <NoteSection
                usersList={this.state.usersList}
                labelsList={this.state.labelsList}
                sectionname={this.state.section} 
                open={this.state.open}
                listView={this.state.listView}/>

                <LabelEdit 
                renderLabelsList={this.renderLabelsList}
                 changeOpenEdit={this.changeOpenEdit}
                labelsList={this.state.labelsList} openEdit={this.state.openEdit}/>
                </div>
                
            )
        }
        else if(this.state.section === '' && this.state.at===''){
            return (
                <div>
                    <MainAppBar 
                openDrawer={this.openDrawer} 
                handleSignOut={this.handleSignOut}
                changeView={this.changeView}
                listView={this.state.listView}
                />
                <Drawer1
                openArTraSection={this.openArTraSection}
                changeOpenEdit={this.changeOpenEdit}
                labelsList={this.state.labelsList} 
                open={this.state.open} openSection={this.openSection} 
                openLabelSection={this.openLabelSection}
                />
                
                <LabelNotesList
                usersList={this.state.usersList}
                labelsList={this.state.labelsList}
                labelname={this.state.labelname} 
                open={this.state.open}
                listView={this.state.listView}/>

                <LabelEdit 
                renderLabelsList={this.renderLabelsList}
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
                openArTraSection={this.openArTraSection}
                />
                
                <ArchiveTrashSection
                usersList={this.state.usersList}
                labelsList={this.state.labelsList}
                at={this.state.at} 
                open={this.state.open}
                listView={this.state.listView}/>

                <LabelEdit 
                renderLabelsList={this.renderLabelsList}
                 changeOpenEdit={this.changeOpenEdit}
                labelsList={this.state.labelsList} openEdit={this.state.openEdit}/>
                </div>
            )
            }
        }
        // return (
        //     <div>
                
                
               
        //     </div>  
        // )
    }



export default Dashboard
