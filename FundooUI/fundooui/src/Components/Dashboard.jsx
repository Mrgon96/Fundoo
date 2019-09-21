import React, { Component } from 'react'
import MainAppBar from './MainAppBar'
import Drawer1 from './Drawer1'
import NoteSection from './NoteSection'
// import NoteEdit from './NoteEdit'
import { Redirect } from 'react-router-dom'
import LabelNotesList from './LabelNotesList'
import LabelEdit from './LabelEdit'
import NoteService from '../Services/NoteService'
import SearchSection from './SearchSection'
import ArchiveTrashSection from './ArchiveTrashSection';
import UserService from '../Services/UserService'
const getLabels = new NoteService().get_Labels
const getUsers = new UserService().get_all_users
const searchNote = new NoteService().search_Note

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
            usersList:[],
            searching:false,
            searchValue:'',
            searchedNotes:[],
            searchResults:[]
            
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
        this.isSearching = this.isSearching.bind(this) 
        this.isNotSearching = this.isNotSearching.bind(this) 
        this.closeOpenEdit = this.closeOpenEdit.bind(this)
        this.handleSearchValue = this.handleSearchValue.bind(this)
        // this.SearchNotes = this.SearchNotes.bind(this)
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

    // SearchNotes= (event, searchData)=>{
        
    // }

    updateSearchResults(obj){
        let searchArray=[]
        searchArray.push(obj)
        this.setState({
            searchResults:searchArray
        })
    }

    isNotSearching(bool, data){
        this.setState({
            searchValue:data,
            searching:bool,
            section:'notes',
            at:'',
            labelname:'',
        })
    }

    handleSearchValue(data){
        this.setState({
            searchValue:data
        })
        
        searchNote(data)
        .then(res=>{
            this.setState({
                searchedNotes:res.data.notes
            })
            console.log("SErach DATA" ,this.state.searchedNotes)
        })
        .catch(error=>{
            console.log("Error")
        })
    }
    isSearching(bool, data){
        this.setState({
            searchValue:data,
            searching:bool,
            section:'',
            at:'',
            labelname:'',
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

    changeOpenEdit(data){
        this.setState({
            openEdit:data
        })
        this.renderLabelsList();
        console.log("OPEN EDIT CHANGED", this.state.openEdit)
    }

    closeOpenEdit(data){
        this.setState({
            openEdit:data
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
            this.setState({
                redirect:false
            })
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
            at:'',
            searching:false
        }) 
    }
    openSection(sectionname){
        console.log('IN OPEN SECTION '+sectionname)
        this.setState({
            section:sectionname,
            labelname:'',
            at:'',
            searching:false
        })
    }

    openArTraSection(sectionname){
        this.setState({
            section:'',
            labelname:'',
            at:sectionname,
            searching:false
        })
    }

    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }


        return (
            <div>
                <MainAppBar 
                openDrawer={this.openDrawer} 
                handleSignOut={this.handleSignOut}
                changeView={this.changeView}
               listView={this.state.listView}
                isSearching={this.isSearching} 
                isNotSearching={this.isNotSearching}
                handleSearchValue={this.handleSearchValue}
                />
                <Drawer1
                changeOpenEdit={this.changeOpenEdit}
                 labelsList={this.state.labelsList}
                 open={this.state.open} openSection={this.openSection} 
                openLabelSection={this.openLabelSection}
                openArTraSection={this.openArTraSection}
                />

                
            {(() => {
                    
                if(this.state.labelname === '' && this.state.at===''  && this.state.searching===false){
                    return <NoteSection
                    updateSearchResults={this.updateSearchResults}
                    searchedNotes={this.state.searchedNotes}
                    usersList={this.state.usersList}
                    labelsList={this.state.labelsList}
                    sectionname={this.state.section} 
                    open={this.state.open}
                    listView={this.state.listView}/>

                }
                else if(this.state.section === '' && this.state.at==='' && this.state.searching===false){
                    return <LabelNotesList
                    usersList={this.state.usersList}
                    labelsList={this.state.labelsList}
                    labelname={this.state.labelname} 
                    open={this.state.open}
                    listView={this.state.listView}/>


                }
                else if(this.state.searching && this.state.section === '' && this.state.at==='' && this.state.labelname === ''){
                    return <SearchSection
                    searchedNotes={this.state.searchedNotes}
                    usersList={this.state.usersList}
                    labelsList={this.state.labelsList}
                    sectionname={this.state.section} 
                    open={this.state.open}
                    listView={this.state.listView}
                    searchValue={this.state.searchValue}/>
                }
                else{
                    return <ArchiveTrashSection
                    updateSearchResults={this.updateSearchResults}
                    searchedNotes={this.state.searchedNotes}
                    usersList={this.state.usersList}
                    labelsList={this.state.labelsList}
                    at={this.state.at} 
                    open={this.state.open}
                    listView={this.state.listView}/>
                }
                    
                })()}   
               

               <LabelEdit 
                renderLabelsList={this.renderLabelsList}
                
                labelsList={this.state.labelsList} 
                openEdit={this.state.openEdit}
                closeOpenEdit={this.closeOpenEdit}
                />
                
            </div>  
        )
    }
}



export default Dashboard
