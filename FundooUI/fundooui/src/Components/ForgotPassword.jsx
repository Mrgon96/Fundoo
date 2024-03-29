import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../App.css'
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService'
const foregotPass = new UserService().forget_password

export class ForgotPassword extends Component {
    constructor(){
        super();
        this.state={
            email:null
        }
    }

    onChangeEamil= event =>{
        this.setState({
            email:event.target.value
        })
    }


    handleSubmit = event =>{
        event.preventDefault();
        var forgotPassData = {
            'email':this.state.email
        }
        foregotPass(forgotPassData)
        .then(res=>{
            console.log("response", res.daat)
        })
        .catch(error=>{
            console.log(error, "ERRORRORORORROR");
            
        })
    }
    render() {
        return (
            <div className="forgotPass">
                <div className="fundooHeading">
                    <span>F</span>
                    <span>u</span>
                    <span>n</span>
                    <span>d</span>
                    <span>o</span>
                    <span>o</span>
                </div>
                <h2>Forgot Password</h2>
                <p>Enter Your Email </p>
                <form onSubmit={this.handleSubmit}>
                
                <table className="table1">
                    <tbody>
                        <tr>
                            <td>
                                <TextField
                                onChange={this.onChangeEamil}
                                label="Email"
                                className="input2"
                                variant="outlined"
                                placeholder="Email"
                                type="email"
                                required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                type="submit"
                                onSubmit={this.handleSubmit}>
                                Submit
                                </Button> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Link to="/">Log in</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </form>  
            </div>
        )
    }
}

export default ForgotPassword
