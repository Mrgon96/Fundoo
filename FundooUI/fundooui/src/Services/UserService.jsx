import axios from 'axios'

class UserService{

    register_service(data){
        return axios.post("http://localhost:8000/users/register/", data)
        
    }

    login_service(data){
        // alert(data)
        return axios.post("http://localhost:8000/users/login/", data)
        
    }

    get_profile_pic(){
        return axios.get("http://localhost:8000/users/pic/")
    }
    
}

export default UserService;
