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
    
    get_all_users(){
        return axios.get("http://localhost:8000/users/userlist/")
    }

    forget_password(data){
        return axios.post("http://localhost:8000/users/forgot_password/",data)
    }

    reset_password(uid,token){
        return axios.get("http://localhost:8000/users/reset_password/"+uid+"/"+token)
    }

    reset_password_confirm(uid,token,data){
        return axios.get("http://localhost:8000/users/reset_password/"+uid+"/"+token+"/", data)
    }
}

export default UserService;
