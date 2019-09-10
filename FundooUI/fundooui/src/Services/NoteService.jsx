import axios from 'axios'
const queryString = require('query-string');
var bodyFormData = new FormData();

class NoteService{
    get_allNotes(){
        return axios.get("http://localhost:8000/notes/list/")
    }

    create_note(data){
        return axios.post("http://localhost:8000/notes/list/", data)
    }
    
    update_note(id, updateData){
        return axios.put("http://localhost:8000/notes/list/"+id+"/", updateData)
    }

    getOneNote(id){
        return axios.get("http://localhost:8000/notes/list/"+id+"/")
    }

    get_Labels(){
        return axios.get("http://localhost:8000/notes/labels/")
    }

    add_Labels(data){
        return axios.post("http://localhost:8000/notes/labels/", data)
    }

    edit_Label(id, data){
        return axios.put("http://localhost:8000/notes/labels/"+id+"/", data)
    }
    get_reminders(){
        return axios.get("http://localhost:8000/notes/reminders/")
    }

    get_label_notes(labelName){
        return axios.get("http://localhost:8000/notes/labeldata/"+labelName+"/")
    }

    get_archives(){
        return axios.get("http://localhost:8000/notes/archives/")
    }

    get_trash(){
        return axios.get("http://localhost:8000/notes/trash/")
    }

    add_collaborator(id,data){
        return axios.post("http://localhost:8000/notes/collaborators/"+id+"/",data)
    }

    search_Note(data){
        return axios.get("http://localhost:8000/notes/search/?search="+data)
    }
}

export default NoteService