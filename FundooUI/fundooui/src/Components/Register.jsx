import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../App.css'
import UserService from '../Services/UserService'


const userService = new UserService().register_service
export class Register extends Component {
    constructor(){
        super();
        this.state ={
            first_name : '',
            last_name : '',
            username : '',
            email : '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
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

    onChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render() {
        return ( 
                <form onSubmit={this.handleSubmit} className="red">
                <h1>Fundoo Notes</h1>
                <h2>Register Here</h2>
                <table className="table1">
                    <tbody>
                        <tr>
                            <td>
                            <TextField 
                                type="text"
                                className="input1" 
                                label="First Name"
                                variant="outlined"
                                name="first_name"
                                onChange={this.onChange}
                                required
                            />
                            </td>
                            <td>
                            <TextField 
                                type="text"
                                className="input1" 
                                placeholder="Last Name"
                                label="Last Name"
                                variant="outlined"
                                name="last_name"
                                onChange={this.onChange}
                                required
                            />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                            <TextField 
                                style={{
                                    width:400
                                }}
                                type="text"
                                className="input1" 
                                placeholder="Username"
                                label="Username"
                                variant="outlined"
                                name="username"
                                onChange={this.onChange}
                                required
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <TextField 
                                type="email"
                                className="input1" 
                                placeholder="E-mail"
                                label="E-mail"
                                variant="outlined"
                                name="email"
                                onChange={this.onChange}
                                required
                            />
                            </td>
                            <td>
                            <TextField 
                                type="password"
                                className="input1" 
                                placeholder="Password"
                                label="Password"
                                variant="outlined"
                                name="password"
                                onChange={this.onChange}
                                required
                                
                            />           
                            </td>
                            
                        </tr>
                        <tr>
                            <td colSpan="2">
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                type="submit"
                            >
                            Sign UP
                            </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                </form>              
        )
    }
}

export default Register
