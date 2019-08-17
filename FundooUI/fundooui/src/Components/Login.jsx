import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import UserService from '../Services/UserService'
import '../App.css'

const userService = new UserService().login_service

export class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }   
        this.handleSubmit=this.handleSubmit.bind(this)
        this.onChange=this.onChange.bind(this)
    }

    handleSubmit = event => {
        event.preventDefault();
        let data = JSON.stringify(this.state)
        console.log(data)
        userService(data)
        .then(res =>{
            console.log(res.data)
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    onChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="login">
                <h1>FundooNotes</h1>
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
                    </tbody>
                </table>
                

                

            </form>
        )
    }
}

export default Login
    