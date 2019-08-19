import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import '../App.css'
import { Link } from 'react-router-dom'

export class ForgotPassword extends Component {
    render() {
        return (
            <div className="forgotPass">
                <h2>Forgot Password</h2>
                <p>Enter Your Email </p>
                <form>
                <table className="table1">
                    <tbody>
                        <tr>
                            <td>
                                <TextField
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
                                >
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
