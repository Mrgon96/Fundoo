import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../App.css'
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService'
const foregotPass = new UserService().forget_password
const resetPass = new UserService().reset_password

export class ResetPass extends Component {
    constructor(){
        super();
        this.state={
            username:null,
            password:null,
            error:null
        }
    }

    onChangeEamil= event =>{
        this.setState({
            password:event.target.value
        })
    }

    componentDidMount(){
        this.waitForUser()
    }

    componentWillUnmount(){
        this.setState({
            username:null,
            password:null,
            error:null
        })
    }

    waitForUser = event =>{
        let uid=this.props.match.params.uid
        let token=this.props.match.params.token
        console.log(this.props.match.params.uid)
        console.log(this.props.match.params.token)
        resetPass(uid, token)
        .then(res=>{
            console.log(res)
            this.setState({
                username:res.data.payload.username
            })
        })
        .catch(error=>{
            this.setState({
                error:error.response.data.error
            })
            console.log(error.response.data.error)
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

        let displayForm = "block"
        let displayError = "none"
        if(this.state.error){
            displayError="block"
            displayForm="none"
        }
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
                
                <div style={{color:"red", display:displayError}}>
                    <p>{this.state.error}</p>
                    <Link to="/">Log in</Link><br></br>
                    <br></br>
                    <Link to="/forgotpass">Forgot Password</Link>
                </div>

                <form onSubmit={this.handleSubmit} style={{display:displayForm}}>
                <h4>{this.state.username}, Reset Your Password</h4>
                <p>Enter New Password </p>
                <table className="table1">
                    <tbody>
                        <tr>
                            <td>
                                <TextField
                                onChange={this.onChangeEamil}
                                label="Password"
                                className="input2"
                                variant="outlined"
                                placeholder="Password"
                                type="password"
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

export default ResetPass
