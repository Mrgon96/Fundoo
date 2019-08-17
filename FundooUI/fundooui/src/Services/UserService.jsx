import axios from 'axios'

class UserService{

    register_service(data){
        return axios.post("http://localhost:8000/users/register/", data)
        
    }

    login_service(data){
        return axios.post("http://localhost:8000/users/login/", data)
        
    }
    
}

export default UserService;
