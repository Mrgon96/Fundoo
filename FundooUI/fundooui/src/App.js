import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Register} from './Components/Register'
import {Login} from './Components/Login'
import {Dashboard} from './Components/Dashboard'
import {Notes} from './Components/Notes'
class App extends Component {
  render() {
    return (
        <div>
            <Router>
                <Route path="/dashboard" exact component={Dashboard}></Route>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/notes" exact component={Notes}/>
            </Router>
        </div>
    );
  }
}
export default App;