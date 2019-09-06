import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import UserService from '../Services/UserService'
import '../App.css'
import { Link, Redirect } from 'react-router-dom'



const userService = new UserService().login_service

export class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false,
        }   
        this.handleSubmit=this.handleSubmit.bind(this)
        this.onChange=this.onChange.bind(this)
    }

    handleSubmit = event => {
        event.preventDefault();
        // let data = JSON.stringify(this.state)
        var data ={
            'username':this.state.username,
            'password':this.state.password  
        }
        // console.log(data)
        userService(data)
        .then(res =>{
            console.log("DATA AFTER LOGIN", res.data);
            
            sessionStorage.setItem('userdata',res.data)
            sessionStorage.setItem('id',res.data.id)
            if(res.data.token){
                localStorage.setItem('token', res.data.token);
                sessionStorage.setItem('email', res.data.email)
                sessionStorage.setItem('username', res.data.username)
                this.setState({redirect:true})
            }

        }).catch(error=>{
            console.log("Error", error);
            var responseError=error.response.data.Error
            alert(responseError)

        })

    }

    onChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {

        if(this.state.redirect){
            return <Redirect to={'/dashboard'} />
        }
        
        if(sessionStorage.getItem("userdata")){
            return <Redirect to={'/dashboard'} />
        }

        return (

            
            <form onSubmit={this.handleSubmit} className="login">
                <div className="fundooHeading">
                    <span>F</span>
                    <span>u</span>
                    <span>n</span>
                    <span>d</span>
                    <span>o</span>
                    <span>o</span>
                </div>
                <h2>Login Here</h2>
                <table className="table1"> 
                    <tbody>
                        <tr>
                            <td>
                                <TextField
                                type="text"
                                name="username"
                                label="Username"
                                variant="outlined"
                                onChange={this.onChange}
                                required
                                />                      
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <TextField
                                type="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                onChange={this.onChange}
                                required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                >
                                   Login 
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <Link to="/register">Register Here</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <Link to="/forgotpass">Forgot Your Password ?</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                

                

            </form>
        )
    }
}

export default Login
    